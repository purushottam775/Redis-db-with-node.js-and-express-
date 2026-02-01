import express from "express";
import User from "../models/User.js";
import redisClient from "../config/redis.js";

const router = express.Router();

/**
 * CREATE USER
 */
router.post("/", async (req, res) => {
    try {
        const user = await User.create(req.body);

        // invalidate cache
        await redisClient.del("users");

        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * GET USERS (Redis Cache)
 */
router.get("/", async (req, res) => {
    try {
        const cachedUsers = await redisClient.get("users");

        if (cachedUsers) {
            return res.json({
                source: "redis",
                data: JSON.parse(cachedUsers)
            });
        }

        const users = await User.find();

        await redisClient.setEx("users", 60, JSON.stringify(users));

        res.json({
            source: "mongodb",
            data: users
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
