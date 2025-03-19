import express from "express";
const app = express();
import db from "./db.js";
import { config } from "dotenv";
config();
app.use(express.json());
const PORT = process.env.PORT || 3000;

import studentRoutes from './routes/studentRoutes.js';
app.use('/student',studentRoutes);

app.listen(PORT, () => {
  console.log(`listening on port 3000`);
});
