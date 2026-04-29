# Taskflow

简洁高效的全栈任务管理应用，基于 Next.js 14 + Prisma + Supabase 构建。

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS v4 + shadcn/ui
- **数据库**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **验证**: Zod
- **数据请求**: SWR
- **通知**: Sonner
- **部署**: Vercel

## 本地启动

```bash
# 1. 克隆仓库
git clone https://github.com/Grace9436/taskflow.git
cd taskflow

# 2. 安装依赖
npm install

# 3. 配置环境变量
# 创建 .env 文件，填入以下内容：
# DATABASE_URL="postgresql://...?pgbouncer=true"
# DIRECT_URL="postgresql://..."

# 4. 运行数据库迁移
npx prisma migrate dev

# 5. 填充测试数据（可选）
npx prisma db seed

# 6. 启动开发服务器
npm run dev
```

打开 http://localhost:3000 查看应用。

## 项目目录结构

```
src/
├── app/
│   ├── api/tasks/          # RESTful API 路由
│   │   ├── route.ts        # GET (列表) + POST (新建)
│   │   └── [id]/route.ts   # PATCH (编辑) + DELETE (删除)
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 主页面（任务仪表盘）
│   ├── not-found.tsx       # 404 页面
│   └── globals.css         # 全局样式
├── components/
│   ├── tasks/              # 任务相关组件
│   │   ├── TaskCard.tsx    # 任务卡片
│   │   ├── TaskForm.tsx    # 任务表单（新建/编辑）
│   │   ├── TaskModal.tsx   # 任务弹窗
│   │   ├── TaskFilters.tsx # 筛选栏
│   │   └── DeleteConfirm.tsx # 删除确认对话框
│   └── ui/                 # shadcn/ui 组件
├── hooks/
│   └── useTasks.ts         # 任务数据 Hook (SWR)
├── lib/
│   ├── prisma.ts           # Prisma 客户端单例
│   ├── validations.ts      # Zod 校验 Schema
│   └── utils.ts            # 工具函数
└── types/
    └── task.ts             # 类型定义
prisma/
├── schema.prisma           # 数据模型定义
├── seed.ts                 # 测试数据
└── migrations/             # 迁移文件
```

## API 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/tasks` | 获取任务列表，支持 `?status=` 和 `?priority=` 筛选 |
| POST | `/api/tasks` | 新建任务 |
| PATCH | `/api/tasks/[id]` | 更新任务 |
| DELETE | `/api/tasks/[id]` | 删除任务 |
