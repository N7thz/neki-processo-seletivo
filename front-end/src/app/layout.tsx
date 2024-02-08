import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import { ThemeProvider } from "@/context/theme-context";
import { UserProvider } from "@/context/user-context";
import "./globals.css";

const firaCode = Fira_Code({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tamago app"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="pt-br">
      <body className={firaCode.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
        >
          <UserProvider>
            {children}
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
