import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import ScrapeRouter from "./routes/scrape.route";
import PdfRouter from "./routes/pdf-upload.route";
import ImageClassifyRouter from "./routes/image-classify.route";
import ChatRouter from "./routes/chat.route";
import cors from "cors"
import { PrismaClient } from "@prisma/client";
import webhookRouter from "./routes/webhook.route";
import SearchEngine from "./routes/search-engine.route";

export const prisma = new PrismaClient();

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
}))

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Looks Good",
  });
})

app.use(
  "/api/v1",
  ScrapeRouter,
  PdfRouter,
  ImageClassifyRouter,
  ChatRouter,
  webhookRouter,
  SearchEngine
);

export default app;
