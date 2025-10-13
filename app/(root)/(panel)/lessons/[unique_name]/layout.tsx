"use client";
import { Roboto } from "next/font/google";
import "@/app/globals.css";
import Heading from "@/app/(global_components)/Heading";
import Link from "next/link";
import { Undo2 } from "lucide-react";
import PlaylistDetails from "./PlaylistDetails";
import GlobalProvider, { GlobalContext } from "./GlobalProvider";
import { useContext } from "react";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

function PlaylistLayout({ children }: { children: React.ReactNode }) {
  const { playlist } = useContext(GlobalContext);

  return (
    <main className="main_body flex flex-col md:flex-row gap-5 items-start">
      <PlaylistDetails playlist={playlist} />
      <div className="flex-1 w-full">
        {children}
      </div>
    </main>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GlobalProvider>
      <PlaylistLayout>{children}</PlaylistLayout>
    </GlobalProvider>
  );
}