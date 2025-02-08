import { toast } from "@/hooks/use-toast";
import { AxiosError } from "axios";

interface APIErrorResponse {
  message?: string;
  error?: string;
}

export function catchAxiosError(error: unknown) {
  if (error instanceof AxiosError) {
    const data = error.response?.data as APIErrorResponse | undefined;

    // Try to get the error message from different possible API response formats
    const apiMessage = data?.message || data?.error;

    // If we have a network error
    if (error.code === "ERR_NETWORK") {
      return "Network error. Please check your connection.";
    }

    // If we have a timeout
    if (error.code === "ECONNABORTED") {
      return "Request timed out. Please try again.";
    }
    return toast({
      variant: "destructive",
      title: "Error",
      description: apiMessage,
    });
  }
}
