import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axiosInstance from "@/lib/axiosinstance";
import { useUser } from "@/lib/AuthContext";

export default function VerifyOTP() {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);

    const router = useRouter();
    const { login } = useUser();

    const email = router.query.email as string;

    const verify = async () => {
        try {
            setLoading(true);

            const deviceId = localStorage.getItem("deviceId");

            const response = await axiosInstance.post("/user/verify-otp", {
                email,
                otp: otp.join(""),
                deviceId,
            });
            login(response.data.result);

            router.push("/");
        } catch (error: any) {
            alert(error.response?.data?.message || "Invalid OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (
        value: string,
        index: number
    ) => {
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            const next = document.getElementById(
                `otp-${index + 1}`
            ) as HTMLInputElement;

            next?.focus();
        }
    };

    const handlePaste = (
        e: React.ClipboardEvent<HTMLInputElement>
    ) => {
        e.preventDefault();

        const pastedData = e.clipboardData
            .getData("text")
            .trim();

        if (!/^\d{6}$/.test(pastedData)) return;

        const otpArray = pastedData.split("");

        setOtp(otpArray);

        const lastInput = document.getElementById(
            "otp-5"
        ) as HTMLInputElement;

        lastInput?.focus();
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key === "Backspace") {
            if (otp[index] === "" && index > 0) {
                const prev = document.getElementById(
                    `otp-${index - 1}`
                ) as HTMLInputElement;

                prev?.focus();
            }
        }

        if (e.key === "ArrowLeft" && index > 0) {
            const prev = document.getElementById(
                `otp-${index - 1}`
            ) as HTMLInputElement;

            prev?.focus();
        }

        if (e.key === "ArrowRight" && index < 5) {
            const next = document.getElementById(
                `otp-${index + 1}`
            ) as HTMLInputElement;

            next?.focus();
        }
    };

    useEffect(() => {
        if (timer === 0) {
            setCanResend(true);
            return;
        }

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    const resendOTP = async () => {
        try {
            await axiosInstance.post("/user/resend-otp", {
                email,
            });

            alert("OTP Sent Again");

            setTimer(30);
            setCanResend(false);
        } catch (error) {
            alert("Failed to resend OTP");
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <div
                style={{
                    width: 350,
                    padding: 25,
                    border: "1px solid #ddd",
                    borderRadius: 10,
                }}
            >
                <h2>Verify OTP</h2>

                <p>Enter the OTP sent to your email.</p>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 20,
                        marginBottom: 20,
                    }}
                >
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onPaste={handlePaste}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onChange={(e) =>
                                handleChange(e.target.value, index)
                            }
                            style={{
                                width: 45,
                                height: 50,
                                textAlign: "center",
                                fontSize: 22,
                                borderRadius: 8,
                                border: "1px solid #ccc",
                            }}
                        />
                    ))}
                </div>

                <button
                    onClick={verify}
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: 12,
                        border: "none",
                        borderRadius: 8,
                        backgroundColor: "#065fd4",
                        color: "white",
                        fontSize: 16,
                        cursor: "pointer",
                    }}
                >
                    {loading ? "Verifying..." : "Verify OTP"}
                </button>

                <div
                    style={{
                        marginTop: 20,
                        textAlign: "center",
                    }}
                >
                    {canResend ? (
                        <button
                            onClick={resendOTP}
                            style={{
                                border: "none",
                                background: "transparent",
                                color: "#065fd4",
                                cursor: "pointer",
                            }}
                        >
                            Resend OTP
                        </button>
                    ) : (
                        <p>Resend OTP in {timer}s</p>
                    )}
                </div>

            </div>
        </div>
    );
}