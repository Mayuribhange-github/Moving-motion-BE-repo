import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRouter from "./routes/user.route.js";
import bookingRouter from "./routes/bookings.route.js";
import driverRouter from "./routes/driver.route.js";
import motionRouter from "./routes/motion.route.js";
import cors from "cors";
import fs from "fs";
import path from "path";
import morgan from "morgan";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io"; // Corrected import for Socket.io

dotenv.config();

const app = express();
const PORT = 4000;

// Override express response send function to log response body
const originalSend = app.response.send;
app.response.send = function sendOverWrite(body) {
  originalSend.call(this, body);
  this.__custombody__ = body;
};

// Static file setup
app.use(express.static(path.join(process.cwd(), "public")));
app.use(express.static("images"));

// MongoDB Connection
mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://localhost:27017/moving-motion-mjr-project")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// API Usage Logger
const apiUsage = {};
app.use((req, res, next) => {
  apiUsage[req.path] = (apiUsage[req.path] || 0) + 1;
  next();
});

// Morgan Logging Configuration
morgan.token("apicount", (req) => JSON.stringify(apiUsage[req.originalUrl]));
morgan.token("res-body", (_req, res) => JSON.stringify(res.__custombody__));
morgan.token("req-body", (req) => JSON.stringify(req.body));

const accessLogStream = fs.createWriteStream(
  path.join(process.cwd(), "access.log"),
  { flags: "a" }
);

app.use(
  morgan(
    ":date[web] :method :url api-count :apicount request-body= :req-body :status :response-time ms - :res[content-length]- response-body = :res-body -:req[content-length]",
    { stream: accessLogStream }
  )
);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes
app.use("/user", userRouter);
app.use("/driver", driverRouter);
app.use("/booking", bookingRouter);
app.use("/motion", motionRouter);

// Create HTTP Server & Attach WebSocket Server
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

// WebSocket Logic: Handle Motion Data
io.on("connection", (socket) => {
  console.log("Client connected via WebSocket");

  socket.on("motionData", (data) => {
    console.log("Received Motion Data:", data);

    let action = "Stationary";
    if (data.acceleration.x > 0.02 || data.acceleration.y > 0.02) {
      action = "Move Forward";
    }
    if (data.gyro.x > 0.005) {
      action = "Turn Left";
    } else if (data.gyro.y > 0.005) {
      action = "Turn Right";
    }

    // Send action back to the frontend in real-time
    socket.emit("motionAction", { recommendedAction: action });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected from WebSocket");
  });
});

// Start Server
server.listen(PORT, () => {
  console.log(`🚀 Server started at http://localhost:${PORT}/`);
});
