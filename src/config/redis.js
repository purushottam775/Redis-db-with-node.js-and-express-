import { createClient } from "redis";

if (!process.env.REDIS_URL) {
    throw new Error("REDIS_URL is not defined in .env");
}

const redisClient = createClient({
    url: process.env.REDIS_URL
});

redisClient.on("connect", () => {
    console.log("Redis Cloud Connected");
});

redisClient.on("error", (err) => {
    console.error("Redis Error:", err.message);
});

await redisClient.connect();

export default redisClient;
