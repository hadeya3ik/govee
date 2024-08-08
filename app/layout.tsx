import type { Metadata } from "next";
import { Archivo } from 'next/font/google'
import "./globals.css";
import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'


const archivo = Archivo({ 
  subsets: ["latin"],
  weight: ["100", "200" , "300", "400", "500", "600", "700"], 
});

export const metadata: Metadata = {
  title: "govee",
  description: "fake app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={` ${archivo.className} bg-custom-invert text-custom-main font-thin p-4`}>{children}</body>
    </html>
  );
}
