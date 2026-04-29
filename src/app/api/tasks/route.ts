import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { TaskCreateSchema } from "@/lib/validations";

const QuerySchema = z.object({
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const query = QuerySchema.safeParse({
      status: searchParams.get("status") ?? undefined,
      priority: searchParams.get("priority") ?? undefined,
    });

    if (!query.success) {
      return NextResponse.json(
        { error: "Validation failed", details: query.error.flatten() },
        { status: 400 }
      );
    }

    const where: Record<string, string> = {};
    if (query.data.status) where.status = query.data.status;
    if (query.data.priority) where.priority = query.data.priority;

    const tasks = await prisma.task.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ data: tasks, message: "success" }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = TaskCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const newTask = await prisma.task.create({ data: parsed.data });

    return NextResponse.json({ data: newTask, message: "success" }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
