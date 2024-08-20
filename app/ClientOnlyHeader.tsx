"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ClientOnlyHeader() {
  const pathname = usePathname();

  // 從環境變數中獲取 Admin 的連結
  const adminBaseUrl = process.env.NODE_ENV === 'development' 
    ? process.env.NEXT_PUBLIC_API_URL 
    : process.env.NEXT_PUBLIC_API_URL_PROD;

  const adminUrl = `${adminBaseUrl}/admin/content-manager/collection-types/api::article.article?page=1&pageSize=10&sort=title:ASC`;

  return (
    <header className="bg-white shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold cursor-pointer">Futurin</h1>
        </Link>
        <nav>
          <Link href="/articles" className="px-4 text-blue-600 hover:text-blue-800">
            Articles
          </Link>
          <Link href={adminUrl} target="_blank" className="px-4 text-blue-600 hover:text-blue-800">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
