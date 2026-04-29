import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useTasks(filters?: { status?: string; priority?: string }) {
  const params = new URLSearchParams();
  if (filters?.status) params.set("status", filters.status);
  if (filters?.priority) params.set("priority", filters.priority);
  const query = params.toString();
  const url = `/api/tasks${query ? `?${query}` : ""}`;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);
  return {
    tasks: data?.data ?? [],
    isLoading,
    isError: !!error,
    mutate,
  };
}

export function useTaskMutations(mutate: () => void) {
  const createTask = async (body: object) => {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw await res.json();
    mutate();
    return res.json();
  };

  const updateTask = async (id: string, body: object) => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw await res.json();
    mutate();
    return res.json();
  };

  const deleteTask = async (id: string) => {
    const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    if (!res.ok) throw await res.json();
    mutate();
  };

  return { createTask, updateTask, deleteTask };
}
