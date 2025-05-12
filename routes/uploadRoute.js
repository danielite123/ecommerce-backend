import express from "express";
import { upload, uploadImages } from "../controller/upload.controller.js";
import { verifyJWT } from "../common/jwt.js";

const app = express.Router();

app.post("/upload", upload.array("images"), uploadImages);

export default app;
