
import { supabase } from "@/integrations/supabase/client";
import type { TablesInsert } from "@/integrations/supabase/types";

type TypingResult = TablesInsert<"typing_results">;

export const saveTypingResult = async (result: Omit<TypingResult, "id" | "created_at">) => {
  const { data, error } = await supabase
    .from("typing_results")
    .insert(result)
    .select()
    .single();

  if (error) {
    console.error("Error saving typing result:", error);
    throw error;
  }

  return data;
};

export const getTypingResults = async (userId?: string | null) => {
  let query = supabase
    .from("typing_results")
    .select("*")
    .order("created_at", { ascending: false });

  if (userId) {
    query = query.eq("user_id", userId);
  } else {
    query = query.is("user_id", null);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching typing results:", error);
    throw error;
  }

  return data;
};

export const getStats = async (userId?: string | null) => {
  const results = await getTypingResults(userId);

  if (!results.length) {
    return {
      averageWpm: 0,
      averageAccuracy: 0,
      bestWpm: 0,
      totalTests: 0,
    };
  }

  const averageWpm = Math.round(
    results.reduce((sum, result) => sum + result.wpm, 0) / results.length
  );

  const averageAccuracy = Math.round(
    results.reduce((sum, result) => sum + result.accuracy, 0) / results.length
  );

  const bestWpm = Math.max(...results.map((result) => result.wpm));

  return {
    averageWpm,
    averageAccuracy,
    bestWpm,
    totalTests: results.length,
    results: results.slice(0, 10),
  };
};
