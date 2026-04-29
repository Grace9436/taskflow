"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon, ClipboardListIcon } from "lucide-react";
import { toast } from "sonner";
import { useTasks, useTaskMutations } from "@/hooks/useTasks";
import { TaskCard } from "@/components/tasks/TaskCard";
import { TaskFilters } from "@/components/tasks/TaskFilters";
import { TaskModal } from "@/components/tasks/TaskModal";
import { DeleteConfirm } from "@/components/tasks/DeleteConfirm";
import { UserMenu } from "@/components/UserMenu";
import type { Task } from "@/types/task";
import type { TaskCreate } from "@/lib/validations";

export default function Home() {
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [deletingTask, setDeletingTask] = useState<Task | undefined>();

  const filters = {
    status: status || undefined,
    priority: priority || undefined,
  };
  const { tasks, isLoading, isError, mutate } = useTasks(filters);
  const { createTask, updateTask, deleteTask } = useTaskMutations(mutate);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(undefined);
  };

  const handleOpenCreate = () => {
    setEditingTask(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCreate = async (data: TaskCreate) => {
    await createTask(data);
  };

  const handleUpdate = async (data: TaskCreate) => {
    if (!editingTask) return;
    await updateTask(editingTask.id, data);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateTask(id, { status: newStatus });
    } catch {
      toast.error("状态更新失败");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingTask) return;
    await deleteTask(deletingTask.id);
    setDeletingTask(undefined);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Taskflow</h1>
            <p className="text-sm text-muted-foreground mt-1">
              共 {tasks.length} 个任务
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={handleOpenCreate}>
              <PlusIcon className="size-4" />
              新建任务
            </Button>
            <UserMenu />
          </div>
        </header>

        {/* Filters */}
        <div className="mb-6">
          <TaskFilters
            status={status}
            priority={priority}
            onStatusChange={setStatus}
            onPriorityChange={setPriority}
          />
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-muted-foreground">加载中...</p>
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-muted-foreground">加载失败，请刷新页面</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <ClipboardListIcon className="size-12 text-muted-foreground/50" />
            <p className="text-muted-foreground">暂无任务</p>
            <Button onClick={handleOpenCreate}>
              <PlusIcon className="size-4" />
              新建第一个任务
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task: Task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleOpenEdit}
                onDelete={setDeletingTask}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        task={editingTask}
        onSuccess={mutate}
        onSubmit={editingTask ? handleUpdate : handleCreate}
      />

      {/* Delete Confirm */}
      <DeleteConfirm
        isOpen={!!deletingTask}
        onClose={() => setDeletingTask(undefined)}
        taskTitle={deletingTask?.title ?? ""}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
