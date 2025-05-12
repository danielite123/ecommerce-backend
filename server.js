import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./db/db.js";
import authRoute from "./routes/authRoute.js";
import productRoute from "./routes/productRoute.js";
import uploadRoute from "./routes/uploadRoute.js";

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", authRoute);
app.use("/", productRoute);
app.use("/", uploadRoute);

app.listen(PORT, () => {
  console.log(`Server is up and running on http://localhost:${PORT}`);
});
