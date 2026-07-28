import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosinstance";
import { useUser } from "@/lib/AuthContext";
import { formatDistanceToNow } from "date-fns";

const Downloads = () => {
    const { user } = useUser();
    const [downloads, setDownloads] = useState<any[]>([]);

    useEffect(() => {
        if (!user?._id) return;

        fetchDownloads();
    }, [user]);

    const fetchDownloads = async () => {
        try {
            const response = await axiosInstance.get(
                `/download/${user._id}`
            );
            setDownloads(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold">
                Downloads
            </h1>

            <p className="text-gray-500 mb-8">
                Current Plan: <span className="font-semibold capitalize">{user?.plan}</span>
            </p>

            {downloads.length === 0 ? (
                <p>No downloaded videos.</p>
            ) : (
                <div className="space-y-6">
                    {downloads.map((item) => (
                        <div
                            key={item._id}
                            className="flex gap-4 border rounded-lg p-4"
                        >
                            <div className="w-52 h-32 rounded-lg bg-gray-200 flex items-center justify-center">
                                <span className="text-5xl">🎥</span>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold">
                                    {item.video?.videotitle}
                                </h2>

                                <p className="mt-2">
                                    Plan: {item.userPlan}
                                </p>

                                <p>
                                    Downloaded{" "}
                                    {formatDistanceToNow(
                                        new Date(item.downloadDate),
                                        { addSuffix: true }
                                    )}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Downloads;