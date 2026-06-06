import type { Metadata } from "next";

import "./globals.css";

import {
  TooltipProvider
} from "@/components/ui/tooltip";

export const metadata:
Metadata = {

  title:
    "Healthcare AI Assistant",

  description:
    "AI-powered medical diagnostic platform"

};

export default function RootLayout({

  children

}: Readonly<{

  children:
    React.ReactNode;

}>) {

  return (

    <html lang="en">

      <body>

        <TooltipProvider>

          {children}

        </TooltipProvider>

      </body>

    </html>

  );

}