"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Task } from "@/types/task";
import type { TaskCreate } from "@/lib/validations";

interface TaskFormProps {
  initialData?: Task;
  onSubmit: (data: TaskCreate) => Promise<void>;
  onCancel: () => void;
}

const statusLabels: Record<string, string> = {
  TODO: "待开始",
  IN_PROGRESS: "进行中",
  DONE: "已完成",
};

const priorityLabels: Record<string, string> = {
  LOW: "低",
  MEDIUM: "中",
  HIGH: "高",
};

export function TaskForm({ initialData, onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [description, setDescription] = useState(
    initialData?.description ?? ""
  );
  const [priority, setPriority] = useState(initialData?.priority ?? "MEDIUM");
  const [status, setStatus] = useState(initialData?.status ?? "TODO");
  const [dueDate, setDueDate] = useState(
    initialData?.dueDate
      ? new Date(initialData.dueDate).toISOString().split("T")[0]
      : ""
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description ?? "");
      setPriority(initialData.priority);
      setStatus(initialData.status);
      setDueDate(
        initialData.dueDate
          ? new Date(initialData.dueDate).toISOString().split("T")[0]
          : ""
      );
    }
  }, [initialData]);

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!title.trim()) {
      e.title = "标题不能为空";
    } else if (title.length > 100) {
      e.title = "标题最多100字符";
    }
    if (!priority) e.priority = "请选择优先级";
    if (!status) e.status = "请选择状态";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim() || undefined,
        priority: priority as TaskCreate["priority"],
        status: status as TaskCreate["status"],
        dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">标题</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="输入任务标题"
          maxLength={100}
        />
        {errors.title && (
          <p className="text-xs text-red-500">{errors.title}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="description">描述</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="输入任务描述（可选）"
          maxLength={500}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label>优先级</Label>
          <Select
            value={priority}
            onValueChange={(v) => v && setPriority(v as typeof priority)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(priorityLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.priority && (
            <p className="text-xs text-red-500">{errors.priority}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label>状态</Label>
          <Select
            value={status}
            onValueChange={(v) => v && setStatus(v as typeof status)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(statusLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.status && (
            <p className="text-xs text-red-500">{errors.status}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="dueDate">截止日期</Label>
        <Input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          取消
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "保存中..." : "保存"}
        </Button>
      </div>
    </form>
  );
}
