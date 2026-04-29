"use client";

import { Button } from "@/components/ui/button";

interface TaskFiltersProps {
  status: string;
  priority: string;
  onStatusChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
}

const statusOptions = [
  { value: "", label: "全部" },
  { value: "TODO", label: "待开始" },
  { value: "IN_PROGRESS", label: "进行中" },
  { value: "DONE", label: "已完成" },
];

const priorityOptions = [
  { value: "", label: "全部" },
  { value: "HIGH", label: "高" },
  { value: "MEDIUM", label: "中" },
  { value: "LOW", label: "低" },
];

export function TaskFilters({
  status,
  priority,
  onStatusChange,
  onPriorityChange,
}: TaskFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground">状态</span>
        <div className="flex gap-1 flex-wrap">
          {statusOptions.map((opt) => (
            <Button
              key={opt.value}
              variant={status === opt.value ? "default" : "outline"}
              size="sm"
              onClick={() => onStatusChange(opt.value)}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          优先级
        </span>
        <div className="flex gap-1 flex-wrap">
          {priorityOptions.map((opt) => (
            <Button
              key={opt.value}
              variant={priority === opt.value ? "default" : "outline"}
              size="sm"
              onClick={() => onPriorityChange(opt.value)}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
