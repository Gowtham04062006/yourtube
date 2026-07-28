import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import socket from "@/lib/socket";
import { useUser } from "@/lib/AuthContext";

const PartyPage = () => {
    const router = useRouter();
    const { roomId } = router.query;

    const { user } = useUser();

    const [participants, setParticipants] = useState<any[]>([]);

    useEffect(() => {
        if (!roomId || !user) return;

        socket.emit("join-room", {
            roomId,
            user: user.name,
        });

        socket.on("participants", (users) => {
            setParticipants(users);
        });

        return () => {
            socket.off("participants");
        };
    }, [roomId, user]);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold">
                Watch Party
            </h1>

            <p className="mt-3">
                Room ID: {roomId}
            </p>

            <button
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Invite link copied!");
                }}
            >
                Copy Invite Link
            </button>

            <h2 className="mt-8 text-xl font-semibold">
                Participants
            </h2>

            <ul className="mt-3 space-y-2">
                {participants.map((p) => (
                    <li
                        key={p.id}
                        className="border rounded p-3"
                    >
                        {p.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PartyPage;