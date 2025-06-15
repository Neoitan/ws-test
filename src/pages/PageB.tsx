import { useEffect, useState } from "react";
import { initWebSocket } from "../services/wsClient";

export const PageB = () => {
  const [dataId, setDataId] = useState<string | null>(null);

  useEffect(() => {
    initWebSocket("B");

    const handleUpdate = (e: Event) => {
      const { detail } = e as CustomEvent;
      setDataId(detail); // ici tu peux fetch la DB avec l'ID reçu
    };

    window.addEventListener("ws-update", handleUpdate);
    return () => window.removeEventListener("ws-update", handleUpdate);
  }, []);

  return <div>Donnée à mettre à jour : {dataId ?? "Aucune"}</div>;
};
