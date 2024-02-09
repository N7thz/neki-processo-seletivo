"use client"

import { Fira_Code } from "next/font/google";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/context/theme-context";
import { UserProvider } from "@/context/user-context";
import "./globals.css";
import { checkPublicRoute } from "@/constants/app-routes";
import { PrivateRoute } from "@/components/private-route";

const firaCode = Fira_Code({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname()

  const isPublicpage = checkPublicRoute(pathname)
  
  return (

    <html lang="pt-br">
      <title>Tamago app</title>
      <body className={firaCode.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
        >
          <UserProvider>

            {
              isPublicpage && children
            }
            {
              !isPublicpage &&
              <PrivateRoute>
                {children}
              </PrivateRoute>
            }
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
