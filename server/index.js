import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";

import userroutes from "./routes/auth.js";
import channelroutes from "./routes/channel.js";
import videoroutes from "./routes/video.js";
import watchlaterroutes from "./routes/watchlater.js";
import commentroutes from "./routes/comment.js";
import downloadRoutes from "./routes/download.js";
import subscriptionRoutes from "./routes/subscription.js";

dotenv.config({
  path: "./.env",
});

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());

app.use(
  express.json({
    limit: "30mb",
  })
);

app.use(
  express.urlencoded({
    limit: "30mb",
    extended: true,
  })
);

app.use(bodyParser.json());

const uploadsPath = path.join(__dirname, "uploads");

app.use("/uploads", express.static(uploadsPath));

app.get("/", (req, res) => {
  res.send("YouTube backend is working");
});

app.use("/user", userroutes);
app.use("/channel", channelroutes);
app.use("/video", videoroutes);
app.use("/watchlater", watchlaterroutes);
app.use("/comment", commentroutes);
app.use("/download", downloadRoutes);
app.use("/subscription", subscriptionRoutes);

const rooms = {};

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("join-room", ({ roomId, user }) => {
    socket.join(roomId);

    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }

    rooms[roomId].push({
      id: socket.id,
      name: user,
    });

    io.to(roomId).emit(
      "participants",
      rooms[roomId]
    );
  });

  socket.on("disconnect", () => {
    Object.keys(rooms).forEach((roomId) => {
      rooms[roomId] = rooms[roomId].filter(
        (u) => u.id !== socket.id
      );

      io.to(roomId).emit(
        "participants",
        rooms[roomId]
      );
    });

    console.log("Disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.DB_URL, {
    dbName: "yourtube",
  })
  .then(() => {
    console.log("MongoDB Connected");
    console.log("Database:", mongoose.connection.name);

    httpServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
