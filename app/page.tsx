import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CFI Ticketing System',
  description: 'Cloud-based ticketing and support tracking system.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
