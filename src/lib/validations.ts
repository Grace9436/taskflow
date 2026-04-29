import { z } from "zod";

export const TaskCreateSchema = z.object({
  title: z.string().min(1, "标题不能为空").max(100, "标题最多100字符"),
  description: z.string().max(500).optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).default("TODO"),
  dueDate: z.string().datetime().optional().nullable(),
});

export const TaskUpdateSchema = TaskCreateSchema.partial();

export type TaskCreate = z.infer<typeof TaskCreateSchema>;
export type TaskUpdate = z.infer<typeof TaskUpdateSchema>;
