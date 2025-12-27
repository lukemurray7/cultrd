import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../auth/AuthProvider";
import { supabase } from "../supabase";

export const useAddCourseToLibrary = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (courseId: string) => {
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("user_library")
        .upsert({
          user_id: user.id,
          course_id: courseId,
          path_id: null,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, courseId) => {
      queryClient.invalidateQueries({ queryKey: ["course", courseId] });
      queryClient.refetchQueries({ queryKey: ["library-courses"] });
      queryClient.refetchQueries({ queryKey: ["library-paths"] });
    },
  });
};

export const useRemoveCourseFromLibrary = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (courseId: string) => {
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase
        .from("user_library")
        .delete()
        .eq("user_id", user.id)
        .eq("course_id", courseId);

      if (error) throw error;
    },
    onSuccess: (_, courseId) => {
      queryClient.invalidateQueries({ queryKey: ["course", courseId] });
      queryClient.refetchQueries({ queryKey: ["library-courses"] });
      queryClient.refetchQueries({ queryKey: ["library-paths"] });
    },
  });
};

export const useAddPathToLibrary = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (pathId: string) => {
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("user_library")
        .upsert({
          user_id: user.id,
          course_id: null,
          path_id: pathId,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, pathId) => {
      queryClient.invalidateQueries({ queryKey: ["path", pathId] });
      queryClient.refetchQueries({ queryKey: ["library-courses"] });
      queryClient.refetchQueries({ queryKey: ["library-paths"] });
    },
  });
};

export const useRemovePathFromLibrary = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (pathId: string) => {
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase
        .from("user_library")
        .delete()
        .eq("user_id", user.id)
        .eq("path_id", pathId);

      if (error) throw error;
    },
    onSuccess: (_, pathId) => {
      queryClient.invalidateQueries({ queryKey: ["path", pathId] });
      queryClient.refetchQueries({ queryKey: ["library-courses"] });
      queryClient.refetchQueries({ queryKey: ["library-paths"] });
    },
  });
};

