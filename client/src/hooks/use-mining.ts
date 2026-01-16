import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { type InsertMiningStats } from "@shared/schema";

// Helper to simulate userId - in a real app this comes from auth context
const USER_ID = 1;

export function useMiningStats() {
  return useQuery({
    queryKey: [api.mining.getStats.path, USER_ID],
    queryFn: async () => {
      const url = buildUrl(api.mining.getStats.path, { userId: USER_ID });
      const res = await fetch(url, { credentials: "include" });
      
      // If user stats don't exist yet (404), return default/empty structure
      // This is a common pattern for "first load" before account initialization
      if (res.status === 404) {
        return {
          userId: USER_ID,
          balance: "0.00",
          hashRate: "0 MH/s",
          active: false,
        };
      }
      
      if (!res.ok) throw new Error("Failed to fetch mining stats");
      return api.mining.getStats.responses[200].parse(await res.json());
    },
    // Refetch often to simulate live stats
    refetchInterval: 3000,
  });
}

export function useToggleMining() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (isActive: boolean) => {
      const url = buildUrl(api.mining.toggle.path, { userId: USER_ID });
      const res = await fetch(url, {
        method: api.mining.toggle.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: isActive }),
        credentials: "include",
      });
      
      if (!res.ok) throw new Error("Failed to toggle mining");
      return api.mining.toggle.responses[200].parse(await res.json());
    },
    onSuccess: (data) => {
      const url = buildUrl(api.mining.getStats.path, { userId: USER_ID });
      queryClient.setQueryData([api.mining.getStats.path, USER_ID], data);
    },
  });
}

export function useUpdateStats() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: Partial<InsertMiningStats>) => {
      const url = buildUrl(api.mining.updateStats.path, { userId: USER_ID });
      const res = await fetch(url, {
        method: api.mining.updateStats.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to update stats");
      return api.mining.updateStats.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.mining.getStats.path, USER_ID] });
    },
  });
}
