let ws: WebSocket | null = null;

export const initWebSocket = (clientId: string) => {
  //   ws = new WebSocket("ws://neoitan:3001"); // ⚠️ adapter à wss://neoitan.fr en prod
  ws = new WebSocket("wss://neoitan.fr/ws/");

  ws.onopen = () => {
    ws?.send(JSON.stringify({ type: "register", clientId }));
  };

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.type === "update") {
      const dataId = msg.dataId;
      window.dispatchEvent(new CustomEvent("ws-update", { detail: dataId }));
    }
  };
};

export const notifyOtherClient = (targetId: string, dataId: string) => {
  ws?.send(JSON.stringify({ type: "notify-update", targetId, dataId }));
};
