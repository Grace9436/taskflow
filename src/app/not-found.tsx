import Link from "next/link";
import { FileQuestionIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4 text-center px-4">
        <FileQuestionIcon className="size-16 text-muted-foreground/40" />
        <h1 className="text-7xl font-bold tracking-tight text-primary">404</h1>
        <p className="text-lg text-muted-foreground">页面不存在</p>
        <Link
          href="/"
          className="mt-4 inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}
