import axios from "axios";
import { toast } from "sonner";
import React, { useEffect, useState } from "react";

export default function SubscriptionPage() {

    const [currentPlan, setCurrentPlan] = useState("free");
    const userId = "6a5ee073179b0073db29d464";

    const upgradePlan = async (
        plan: string,
        amount: number
    ) => {
        try {

            await axios.post(
                "http://localhost:5001/subscription",
                {
                    userId,
                    plan,
                    amount,
                }
            );

            await axios.patch(
                "http://localhost:5001/subscription/update-plan",
                {
                    userId,
                    plan,
                }
            );
            setCurrentPlan(plan);

            toast.success(`${plan} plan activated!`);
        } catch (error) {
            console.error(error);
            toast.error("Upgrade failed");
        }
    };

    useEffect(() => {
        const fetchPlan = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5001/subscription/plan/${userId}`
                );

                setCurrentPlan(res.data.plan);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPlan();
    }, []);

    return (
        <div className="p-10">

            <div className="flex-1 p-10">

                <h2 className="text-xl font-semibold mb-3">
                    Current Plan :
                    <span className="text-red-600 capitalize">
                        {" "}{currentPlan}
                    </span>
                </h2>

                <h1 className="text-4xl font-bold mb-8">
                    Subscription Plans
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                    <div className="border rounded-xl p-6 shadow">
                        <h2 className="text-2xl font-bold">Free</h2>

                        <p className="text-3xl font-bold mt-4">
                            ₹0
                        </p>

                        <ul className="mt-6 space-y-2">
                            <li>✔ 1 Download / day</li>
                            <li>✔ Standard Videos</li>
                        </ul>

                        {currentPlan === "free" ? (
                            <button
                                disabled
                                className="mt-6 bg-gray-500 text-white w-full py-2 rounded"
                            >
                                Current Plan
                            </button>
                        ) : (
                            <button
                                disabled
                                className="mt-6 bg-gray-300 text-gray-600 w-full py-2 rounded cursor-not-allowed"
                            >
                                Free Plan
                            </button>
                        )}
                    </div>

                    <div className="border rounded-xl p-6 shadow">
                        <h2 className="text-2xl font-bold">Bronze</h2>

                        <p className="text-3xl font-bold mt-4">
                            ₹99
                        </p>

                        <ul className="mt-6 space-y-2">
                            <li>✔ 5 Downloads / day</li>
                            <li>✔ Premium Videos</li>
                        </ul>

                        {currentPlan === "bronze" ? (
                            <button
                                disabled
                                className="mt-6 bg-gray-500 text-white w-full py-2 rounded"
                            >
                                Current Plan
                            </button>
                        ) : (
                            <button
                                onClick={() => upgradePlan("bronze", 99)}
                                className="mt-6 bg-red-600 text-white w-full py-2 rounded"
                            >
                                Upgrade
                            </button>
                        )}
                    </div>

                    <div className="border rounded-xl p-6 shadow">
                        <h2 className="text-2xl font-bold">Silver</h2>

                        <p className="text-3xl font-bold mt-4">
                            ₹199
                        </p>

                        <ul className="mt-6 space-y-2">
                            <li>✔ 15 Downloads / day</li>
                            <li>✔ Less Ads</li>
                        </ul>

                        {currentPlan === "silver" ? (
                            <button
                                disabled
                                className="mt-6 bg-gray-500 text-white w-full py-2 rounded"
                            >
                                Current Plan
                            </button>
                        ) : (
                            <button
                                onClick={() => upgradePlan("silver", 199)}
                                className="mt-6 bg-red-600 text-white w-full py-2 rounded"
                            >
                                Upgrade
                            </button>
                        )}
                    </div>

                    <div className="border rounded-xl p-6 shadow">
                        <h2 className="text-2xl font-bold">Gold</h2>

                        <p className="text-3xl font-bold mt-4">
                            ₹499
                        </p>

                        <ul className="mt-6 space-y-2">
                            <li>✔ Unlimited Downloads</li>
                            <li>✔ Ad Free</li>
                        </ul>

                        {currentPlan === "gold" ? (
                            <button
                                disabled
                                className="mt-6 bg-gray-500 text-white w-full py-2 rounded"
                            >
                                Current Plan
                            </button>
                        ) : (
                            <button
                                onClick={() => upgradePlan("gold", 499)}
                                className="mt-6 bg-red-600 text-white w-full py-2 rounded"
                            >
                                Upgrade
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}