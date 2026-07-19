import axios, { AxiosError } from "axios";
import { apiErrorSchema, type ApiErrorShape } from "@portfolio/types";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

function normalizeError(error: AxiosError): ApiErrorShape {
  const parsed = apiErrorSchema.safeParse((error.response?.data as { error?: unknown })?.error);
  if (parsed.success) return parsed.data;

  return { message: error.message || "request failed" };
}

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => Promise.reject(normalizeError(error))
);
