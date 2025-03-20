import { Header } from "@/components/header";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col container mx-auto pb-8">
        <Header />
        {children}
      </body>
    </html>
  );
}
