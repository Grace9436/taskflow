import type { Task, Status, Priority } from "@prisma/client";

export type { Task, Status, Priority };

export type TaskWithFormatted = Task & {
  isOverdue: boolean;
};
