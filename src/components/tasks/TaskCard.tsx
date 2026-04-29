"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PencilIcon, Trash2Icon, Loader2Icon } from "lucide-react";
import type { Task } from "@/types/task";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onStatusChange: (id: string, status: string) => Promise<void>;
}

const nextStatus: Record<string, string> = {
  TODO: "IN_PROGRESS",
  IN_PROGRESS: "DONE",
  DONE: "TODO",
};

const statusVariant: Record<string, "default" | "secondary" | "outline"> = {
  TODO: "default",
  IN_PROGRESS: "secondary",
  DONE: "outline",
};

const statusLabel: Record<string, string> = {
  TODO: "待开始",
  IN_PROGRESS: "进行中",
  DONE: "已完成",
};

const priorityVariant: Record<string, string> = {
  HIGH: "destructive",
  MEDIUM: "orange",
  LOW: "green",
};

const priorityLabel: Record<string, string> = {
  HIGH: "高",
  MEDIUM: "中",
  LOW: "低",
};

export function TaskCard({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskCardProps) {
  const [switching, setSwitching] = useState(false);

  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== "DONE";

  const handleStatusCycle = async () => {
    setSwitching(true);
    try {
      await onStatusChange(task.id, nextStatus[task.status]);
    } finally {
      setSwitching(false);
    }
  };

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  return (
    <div className="rounded-xl border bg-card p-5 flex flex-col gap-3 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold leading-snug line-clamp-2 flex-1">
          {task.title}
        </h3>
        <div className="flex gap-1 shrink-0">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onEdit(task)}
            title="编辑"
          >
            <PencilIcon className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onDelete(task)}
            title="删除"
            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
          >
            <Trash2Icon className="size-4" />
          </Button>
        </div>
      </div>

      {task.description && (
        <p className="text-sm text-gray-500 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        <Badge
          variant={
            priorityVariant[task.priority] as
              | "destructive"
              | "default"
              | "secondary"
          }
          className={
            task.priority === "MEDIUM"
              ? "bg-orange-100 text-orange-700 hover:bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400"
              : task.priority === "LOW"
                ? "bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400"
                : ""
          }
        >
          {priorityLabel[task.priority]}
        </Badge>
        <Badge variant={statusVariant[task.status]}>
          {statusLabel[task.status]}
        </Badge>
      </div>

      {task.dueDate && (
        <p
          className={`text-xs ${isOverdue ? "text-red-500 font-medium" : "text-gray-500"}`}
        >
          {isOverdue ? "⚠ 已超期 · " : ""}
          {formatDate(task.dueDate)}
        </p>
      )}

      <div className="mt-auto pt-2 border-t">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={handleStatusCycle}
          disabled={switching}
        >
          {switching ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            `切换为 ${statusLabel[nextStatus[task.status]]}`
          )}
        </Button>
      </div>
    </div>
  );
}
