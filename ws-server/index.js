const express = require("express");
const http = require("http");
const { WebSocketServer } = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const clients = new Map();

wss.on("connection", (ws) => {
  let clientId = null;

  ws.on("message", (data) => {
    try {
      const msg = JSON.parse(data.toString());

      if (msg.type === "register") {
        clientId = msg.clientId;
        clients.set(clientId, ws);
      }

      if (msg.type === "notify-update") {
        const { targetId, dataId } = msg;
        const target = clients.get(targetId);
        if (target) {
          target.send(JSON.stringify({ type: "update", dataId }));
        }
      }
    } catch (err) {
      console.error("Erreur:", err);
    }
  });

  ws.on("close", () => {
    if (clientId) clients.delete(clientId);
  });
});

server.listen(3001, () => {
  console.log("WebSocket server on ws://localhost:3001");
});
