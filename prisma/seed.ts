import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "demo@taskflow.dev" },
    update: {},
    create: {
      email: "demo@taskflow.dev",
      name: "Demo User",
    },
  });

  await prisma.task.createMany({
    data: [
      {
        title: "完成项目需求文档",
        description: "整理 Taskflow 的功能需求和技术方案",
        priority: "HIGH",
        status: "DONE",
        userId: user.id,
      },
      {
        title: "设计数据库结构",
        description: "用 Prisma 定义 Task 模型和枚举类型",
        priority: "HIGH",
        status: "IN_PROGRESS",
        userId: user.id,
      },
      {
        title: "开发后端 API",
        description: "实现 GET / POST / PATCH / DELETE 四个接口",
        priority: "MEDIUM",
        status: "TODO",
        userId: user.id,
      },
      {
        title: "编写前端页面",
        description: "任务列表、新建、编辑、删除、筛选功能",
        priority: "MEDIUM",
        status: "TODO",
        userId: user.id,
      },
      {
        title: "部署到 Vercel",
        description: "配置环境变量并部署到生产环境",
        priority: "LOW",
        status: "TODO",
        userId: user.id,
      },
    ],
  });
  console.log("✅ Seed 完成，已插入 5 条测试数据");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
