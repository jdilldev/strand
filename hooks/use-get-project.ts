// hooks/useProject.ts
import { getSupabaseClient } from "@/utils/supabase";
import { useCallback, useEffect, useState } from "react";

const supabase = getSupabaseClient();

export type Project = {
  id: string;
  name: string;
  created_at: string;
  // add other columns here
};

export function useProject(projectId: string | null) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProject = useCallback(async () => {
    if (!projectId) {
      setProject(null);
      return;
    }

    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("project")
      .select("*")
      .eq("id", projectId)
      .single();

    if (error) {
      setError(error.message);
      setProject(null);
    } else {
      setProject(data);
    }

    setLoading(false);
  }, [projectId]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  return {
    project,
    loading,
    error,
    refetch: fetchProject,
  };
}
