import { API_BASE_URL } from "@/utils/config";
import type {
  ApiResponse,
  Match,
  MatchDetail,
  MatchesResponse,
} from "@/types/match";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new ApiError(`Request to ${path} failed`, response.status);
  }

  const body = (await response.json()) as ApiResponse<T>;

  if (!body.success) {
    throw new ApiError(`Request to ${path} was unsuccessful`, response.status);
  }

  return body.data;
}

export function getMatches(): Promise<MatchesResponse> {
  return apiGet<MatchesResponse>("/api/matches");
}

export function getLiveMatches(): Promise<MatchesResponse> {
  return apiGet<MatchesResponse>("/api/matches/live");
}

export function getMatchById(id: string): Promise<MatchDetail> {
  return apiGet<MatchDetail>(`/api/matches/${id}`);
}

export type { Match, MatchDetail, MatchesResponse };
