import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { apiErrorSchema, type ApiErrorShape } from "@portfolio/types";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_CMS,
  withCredentials: true,
});

interface RetryableConfig extends InternalAxiosRequestConfig {
  _retried?: boolean;
}

function getAccessToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)portfolio_access_pub=([^;]+)/);
  return match?.[1] ? decodeURIComponent(match[1]) : null;
}

function normalizeError(error: AxiosError): ApiErrorShape {
  const parsed = apiErrorSchema.safeParse((error.response?.data as { error?: unknown })?.error);
  if (parsed.success) return parsed.data;
  return { message: error.message || "request failed" };
}

// Attach Bearer token to every request
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let refreshPromise: Promise<void> | null = null;

async function refreshSession() {
  if (!refreshPromise) {
    refreshPromise = fetch("/api/auth/refresh", { method: "POST", credentials: "same-origin" })
      .then(async (res) => {
        if (!res.ok) throw new Error("refresh failed");
      })
      .finally(() => { refreshPromise = null; });
  }
  return refreshPromise;
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as RetryableConfig | undefined;
    const code = (error.response?.data as { error?: { code?: string } })?.error?.code;

    if (
      error.response?.status === 401 &&
      code === "ACCESS_TOKEN_EXPIRED" &&
      config &&
      !config._retried
    ) {
      config._retried = true;
      try {
        await refreshSession();
        const token = getAccessToken();
        if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
        return api(config);
      } catch {
        if (typeof window !== "undefined") window.location.href = "/login";
      }
    }

    return Promise.reject(normalizeError(error));
  }
);
