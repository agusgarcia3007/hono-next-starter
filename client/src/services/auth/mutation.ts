import { catchAxiosError } from "@/lib/catch-axios-error";
import { http } from "@/lib/http";
import { LoginData, SignupData } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";

const handleAuthSuccess = (data: { token: string }) => {
  localStorage.setItem("token", data.token);
  const lastPath = localStorage.getItem("lastPath");
  if (lastPath) {
    window.location.href = lastPath;
    localStorage.removeItem("lastPath");
    return;
  }
  window.location.href = "/";
};

export const useLoginMutation = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (loginData: LoginData) => {
      const { data } = await http.post("/auth/login", loginData);
      return data;
    },
    onError: (error) => catchAxiosError(error),
    onSuccess: handleAuthSuccess,
  });
};

export const useSignupMutation = () => {
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: async (signupData: SignupData) => {
      const { data } = await http.post("/auth/signup", signupData);
      return data;
    },
    onError: (error) => catchAxiosError(error),
    onSuccess: handleAuthSuccess,
  });
};
