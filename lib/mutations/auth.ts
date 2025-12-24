import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase";

interface SignInWithEmailParams {
  email: string;
  password: string;
}

interface SignUpWithEmailParams {
  email: string;
  password: string;
}

interface ResetPasswordParams {
  email: string;
}

interface SignInWithOAuthParams {
  provider: "google" | "apple";
}

interface UpdatePasswordParams {
  newPassword: string;
}

export const useSignInWithEmail = () => {
  return useMutation({
    mutationFn: async ({ email, password }: SignInWithEmailParams) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return data;
    },
  });
};

export const useSignUpWithEmail = () => {
  return useMutation({
    mutationFn: async ({ email, password }: SignUpWithEmailParams) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      return data;
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async ({ email }: ResetPasswordParams) => {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.EXPO_PUBLIC_APP_URL || "exp://localhost:8081"}/auth/reset-password`,
      });
      if (error) throw error;
      return data;
    },
  });
};

export const useSignInWithOAuth = () => {
  return useMutation({
    mutationFn: async ({ provider }: SignInWithOAuthParams) => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${process.env.EXPO_PUBLIC_APP_URL || "exp://localhost:8081"}/auth/callback`,
        },
      });
      if (error) throw error;
      return data;
    },
  });
};

export const useSignOut = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: async ({ newPassword }: UpdatePasswordParams) => {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) throw error;
      return data;
    },
  });
};

