"use client";
import { Roboto } from "next/font/google";
import "@/app/globals.css";
import Heading from "@/app/(global_components)/Heading";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";
import LessonProvider, { LessonContext } from "./LessonProvider";
import { useContext } from "react";
import PageMessage from "@/app/(global_components)/PageMessage";
import { useParams } from "next/navigation";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

function LessonLayout({ children }: { children: React.ReactNode }) {
  const { order, unique_name } = useParams();
  const { lesson } = useContext(LessonContext);

  if (!lesson) {
    return (
      <div className="flex items-center justify-center py-10">
        <PageMessage
          title="Seriya topilmadi"
          message="Boshqa seriya bilan urunib ko'ring"
        />
      </div>
    );
  }

  const current_link = `/lessons/${unique_name}/ep/${order}`;

  return (
    <div className={`${roboto.className} antialiased w-full space-y-5`}>
      <div className="w-full flex items-center justify-between">
        <Link href={current_link} className="flex">
          <Heading>Seriya #{order}</Heading>
        </Link>
        <div className="flex items-center gap-3 ">
          <Link href={current_link + "/update"} className="basic_button2">
            <Edit /> Tahrirlash
          </Link>
          <Link href={current_link + "/remove"} className="basic_button2">
            <Trash2 />
          </Link>
        </div>
      </div>
      <div className="w-full">
        {children}
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LessonProvider>
      <LessonLayout>{children}</LessonLayout>
    </LessonProvider>
  );
}