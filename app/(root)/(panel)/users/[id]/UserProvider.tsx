'use client'
import { createContext, useEffect, useState } from "react";
import { User } from "@/app/types/User";
import userService from "@/app/api/services/userService";
import { useParams } from "next/navigation";
import Loader from "@/app/(global_components)/Loader";

export const UserContext = createContext<any>(null);

export default function UserProvider({ children }: { children: React.ReactNode }) {
    const { id } = useParams();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function GetUser() {
        try {
            setLoading(true);
            const res: any = await userService.getById(String(id));
            const user: User = res;
            setUser(user);
            setError(null);
        } catch (err: any) {
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Xatolik yuz berdi. Iltimos, qaytadan urinib ko‘ring.");
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        GetUser();
    }, []);

    if (loading) {
        return (
            <div className="py-20 flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <p className="text-red-600 bg-red-50 rounded-xl px-4 py-2 text-center">
                {error}
            </p>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}