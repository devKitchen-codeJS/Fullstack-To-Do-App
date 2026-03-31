import Header from "@/components/layout/Header";
import React from "react";
import { WindowProvider } from "../context/Window/WindowContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <WindowProvider>
          <Header />
          {children}
        </WindowProvider>
      </body>
    </html>
  );
}
