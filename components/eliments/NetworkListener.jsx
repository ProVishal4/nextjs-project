"use client";
import { useEffect } from "react";
import { useNetworkStore } from "@/store/networkStore";

export default function NetworkListener() {
  const setOnline = useNetworkStore((state) => state.setOnline);

  useEffect(() => {
    setOnline(navigator.onLine);

    const online = () => setOnline(true);
    const offline = () => setOnline(false);

    window.addEventListener("online", online);
    window.addEventListener("offline", offline);

    return () => {
      window.removeEventListener("online", online);
      window.removeEventListener("offline", offline);
    };
  }, []);

  return null;
}
