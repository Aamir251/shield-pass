import type { Metadata } from "next";
import { Inter, Jost } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/auth-provider";


const inter = Inter({ subsets: ["latin"] });

const jost = Jost({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`${jost.className} bg-primary-dark relative text-primary-white`}>
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
