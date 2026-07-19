import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { apiErrorSchema, type ApiErrorShape } from "@portfolio/types";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_CMS,
  withCredentials: true,
});

interface RetryableConfig extends InternalAxiosRequestConfig {
  _retried?: boolean;
}

function normalizeError(error: AxiosError): ApiErrorShape {
  const parsed = apiErrorSchema.safeParse((error.response?.data as { error?: unknown })?.error);
  if (parsed.success) return parsed.data;

  return { message: error.message || "request failed" };
}

let refreshPromise: Promise<void> | null = null;

async function refreshSession() {
  if (!refreshPromise) {
    refreshPromise = api
      .post("/api/auth/refresh")
      .then(() => undefined)
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as RetryableConfig | undefined;
    const code = (error.response?.data as { error?: { code?: string } })?.error?.code;

    if (error.response?.status === 401 && code === "ACCESS_TOKEN_EXPIRED" && config && !config._retried) {
      config._retried = true;
      try {
        await refreshSession();
        return api(config);
      } catch {
        if (typeof window !== "undefined") window.location.href = "/login";
      }
    }

    return Promise.reject(normalizeError(error));
  }
);
