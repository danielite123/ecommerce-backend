import express from "express";
import { login, registerAdmin } from "../controller/user.controller.js";

const app = express.Router();

app.post("/admin/signup", registerAdmin);
app.post("/login", login);

export default app;
