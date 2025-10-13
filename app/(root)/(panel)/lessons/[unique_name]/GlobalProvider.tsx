'use client'
import { createContext, useEffect, useState } from "react";
import { Playlist } from "@/app/types/User";
import playlistService from "@/app/api/services/playlistsService";
import { useParams } from "next/navigation";
import Loader from "@/app/(global_components)/Loader";
import PageMessage from "@/app/(global_components)/PageMessage";

export const GlobalContext = createContext<any>(null);

export default function GlobalProvider({ children }: { children: React.ReactNode }) {
    const { unique_name } = useParams();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    //   main
    const [playlist, setPlaylist] = useState<Playlist | null>(null);

    async function GetPlaylist() {
        if (playlist) {
            return;
        }
        try {
            const res: any = await playlistService.getByUniqueName(
                String(unique_name)
            );
            const ResPlaylist: Playlist = res;
            setPlaylist(ResPlaylist);
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
        GetPlaylist();
    }, []);

    return (
        <GlobalContext.Provider value={{ playlist, setPlaylist }}>
            {loading ? (
                <div className="w-full flex justify-center items-center py-20">
                    <Loader />
                </div>
            ) : (
                <>
                    {error && (
                        <p className="text-red-600 bg-red-50 rounded-xl px-4 py-2 text-center">
                            {error}
                        </p>
                    )}
                    {playlist ? (
                        children
                    ) : (
                        <div className="w-full items-center justify-center py-20">
                            <PageMessage
                                title="Dars topilmadi"
                                message="Keyinroq qayta urunib ko'ring"
                            />
                        </div>
                    )}
                </>
            )}
        </GlobalContext.Provider>
    )

}