"use client";

import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";
import { provider, auth } from "./firebase";
import axiosInstance from "./axiosinstance";
import { useRouter } from "next/router";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);

        setUser(parsedUser);

        applyTheme(parsedUser.theme || "light");
      }
    }
  }, []);

  const applyTheme = (theme) => {
    if (typeof document === "undefined") return;

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const login = (userdata) => {

    setUser(userdata);

    applyTheme(userdata.theme || "light");

    localStorage.setItem("user", JSON.stringify(userdata));
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);

    applyTheme(updatedUser.theme || "light");

    if (typeof window !== "undefined") {
      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );
    }
  };

  const logout = async () => {
    setUser(null);

    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }

    await signOut(auth);
  };

  const handlegooglesignin = async () => {
    try {
      provider.setCustomParameters({
        prompt: "select_account",
      });

      const result = await signInWithPopup(auth, provider);

      let deviceId = localStorage.getItem("deviceId");

      if (!deviceId) {
        deviceId = crypto.randomUUID();
        localStorage.setItem("deviceId", deviceId);
      }

      const payload = {
        email: result.user.email,
        name: result.user.displayName,
        image:
          result.user.photoURL ||
          "https://github.com/shadcn.png",
        deviceId,
      };

      const response = await axiosInstance.post(
        "/user/login",
        payload
      );

      if (response.data.otpRequired) {
        router.push(
          `/verify-otp?email=${encodeURIComponent(
            response.data.email
          )}`
        );
        return;
      }

      login(response.data.result);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseuser) => {
        if (!firebaseuser) {
          setUser(null);

          if (typeof window !== "undefined") {
            localStorage.removeItem("user");
          }
        }
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        handlegooglesignin,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
export const useUser = () => {
  return useContext(UserContext);
};