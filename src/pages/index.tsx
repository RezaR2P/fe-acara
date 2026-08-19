import { Geist, Geist_Mono } from 'next/font/google';
import { Button } from '@heroui/react';
import PageHead from '@/components/commons/PageHead';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <PageHead />
      <Button>My Button</Button>
    </main>
  );
}
