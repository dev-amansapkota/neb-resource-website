import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/app/globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'NEB Resource',
  description: 'Empowering students with the best study materials.',
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
