"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-sm border w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-2">Taskflow</h1>
        <p className="text-gray-500 mb-8">登录以管理你的任务</p>
        <Button
          className="w-full"
          onClick={() => signIn("github", { callbackUrl: "/" })}
        >
          使用 GitHub 登录
        </Button>
      </div>
    </div>
  );
}
