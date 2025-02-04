import express, { RequestHandler } from "express";
import GoogleAuth from "../auth/googleAuth";
// import DetectFood from "../food-detection-api/detectFood";

const router = express.Router();

router.post("/googleAuth", GoogleAuth as RequestHandler);
// router.post("/detectFood", DetectFood as RequestHandler);

export default router;
