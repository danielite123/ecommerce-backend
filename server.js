import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./db/db.js";
import authRoute from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", authRoute);

app.listen(PORT, () => {
  console.log(`Server is up and running on http://localhost:${PORT}`);
});
