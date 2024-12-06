import express from "express";
import dotenv from "dotenv";
import taskRoutes from "./routes/TaskRoutes";

dotenv.config();

const app = express();
app.use(express.json());

// app.use("/", (_req, res) => {
//   res.json({ server: "Started",time: new Date() });
// });

app.use("/api", taskRoutes);
export default app;
