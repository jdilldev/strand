import { getSupabaseClient } from "@/utils/supabase";
import { useEffect, useState } from "react";

type ThreadItemResult<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export function useSupabaseItem<T>(
  table: string,
  column: string,
  value: string | number | undefined
): ThreadItemResult<T> {
  const supabase = getSupabaseClient();

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!column) {
      setLoading(false);
      return;
    }

    async function fetchItem() {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from(table)
        .select()
        .eq(column, value)
        .single();

      if (error) {
        setError(error.message);
        setData(null);
      } else {
        setData(data as T);
      }

      setLoading(false);
    }

    fetchItem();
  }, [table, column, value, supabase]);

  return { data, loading, error };
}
