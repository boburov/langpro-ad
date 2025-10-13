'use client'
import { createContext, useContext, useState } from "react";
import { Lesson } from "@/app/types/User";
import { GlobalContext } from "../../GlobalProvider";
import { useParams } from "next/navigation";
import PageMessage from "@/app/(global_components)/PageMessage";

export const LessonContext = createContext<any>(null);

export default function LessonProvider({ children }: { children: React.ReactNode }) {
    const { order } = useParams();
    const { playlist } = useContext(GlobalContext);
    const lessons: Lesson[] = playlist.lessons;

    const [lesson, setLesson] = useState<Lesson | undefined>(
        lessons.find((le) => le.order === Number(order))
    );

    if (!lesson) {
        return null;
    }

    const current_link = `/lessons/${playlist.unique_name}/ep/${lesson?.order}`;

    return (
        <LessonContext.Provider value={{ lesson, setLesson, current_link }}>
            {children}
        </LessonContext.Provider>
    )
}