import { useEffect } from "react";
import { initWebSocket, notifyOtherClient } from "../services/wsClient";

export const PageA = () => {
  useEffect(() => {
    initWebSocket("A");
  }, []);

  const sendUpdate = () => {
    notifyOtherClient("B", "" + Math.random() * 10);
  };

  return <button onClick={sendUpdate}>Envoyer update à B</button>;
};
