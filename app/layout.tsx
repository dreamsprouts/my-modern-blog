import './globals.css';
import { Inter } from 'next/font/google';
import ClientOnlyHeader from './ClientOnlyHeader'; // 引入新的 Client Component

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Futurin',
  description: 'A modern blog powered by Next.js and Strapi',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-gray-50 text-gray-900">
        <div className="min-h-screen flex flex-col">
          <ClientOnlyHeader />
          <main className="container mx-auto flex-1 p-4">
            {children}
          </main>
          <footer className="bg-white shadow p-4 mt-8">
            <div className="container mx-auto text-center text-gray-600">
              &copy; {new Date().getFullYear()} Futurin. All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
