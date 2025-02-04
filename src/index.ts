import { config } from "dotenv";
import connectDb from "./db/connectDb";
import express, { Request, Response, Application } from "express";
import web from "./router/web";
import cors from "cors";
config();

async function serverStart() {
  try {
    const app: Application = express();

    app.get("/status", (req: Request, res: Response) => {
      res.json({ status: "ok" });
    });

    app.use(express.json({ limit: "50mb" }));
    app.use(express.urlencoded({ extended: true, limit: "50mb" }));
    app.use(
      cors({
        credentials: true,
        origin: String(process.env.RequestPort),
      })
    );

    app.use("/", web);

    const DATABASE_URL = process.env.DATABASE_URL as string;
    await connectDb(DATABASE_URL);

    const port: Number = parseInt(process.env.PORT || "8080");

    const server = app.listen(port, () => {
      console.log(`server is running on  http://localhost:${port}`);
    });
  } catch (err) {
    console.log("error in start server", err);
  }
}
serverStart();
