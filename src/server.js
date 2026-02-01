import "dotenv/config";
import express from "express";
import cors from "cors";

import connectMongo from "./config/mongo.js";
import "./config/redis.js";

import logger from "./middleware/logger.middleware.js";
import responseTime from "./middleware/responseTime.middleware.js";
import errorHandler from "./middleware/error.middleware.js";

import userRoutes from "./routes/user.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

/* ---------- Middlewares ---------- */
app.use(cors());
app.use(express.json());

app.use(logger);
app.use(responseTime);

/* ---------- Routes ---------- */
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.json({ status: "Server running " });
});

/* ---------- Error Middleware ---------- */
app.use(errorHandler);

/* ---------- Start Server ---------- */
await connectMongo();

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});
