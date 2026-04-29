"use client";

import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TaskForm } from "@/components/tasks/TaskForm";
import type { Task } from "@/types/task";
import type { TaskCreate } from "@/lib/validations";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task;
  onSuccess: () => void;
  onSubmit: (data: TaskCreate) => Promise<void>;
}

export function TaskModal({
  isOpen,
  onClose,
  task,
  onSuccess,
  onSubmit,
}: TaskModalProps) {
  const handleSubmit = async (data: TaskCreate) => {
    try {
      await onSubmit(data);
      toast.success("保存成功");
      onSuccess();
      onClose();
    } catch {
      toast.error("保存失败，请重试");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task ? "编辑任务" : "新建任务"}</DialogTitle>
        </DialogHeader>
        <TaskForm
          initialData={task}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
