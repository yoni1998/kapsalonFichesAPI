/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import { Routes, FicheRoutes } from "./src/routes/index";
import { FormuleRoutes } from "./src/routes/formule.route";
dotenv.config();

/**
 * App Variables
 */
if (!process.env.PORT) {
  process.exit(1);
}

const routes: Routes = new Routes();
const ficheRoutes: FicheRoutes = new FicheRoutes();
const formuleRoutes: FormuleRoutes = new FormuleRoutes();
const PORT: number = parseInt(process.env.PORT as string, 10);
const URI: string = process.env.URI as string;

/**
 *  App Configuration
 */

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
routes.route(app);
ficheRoutes.route();
formuleRoutes.route();

// connect to db
const connectToDb = async () => {
  const conn = await mongoose.connect(URI);
  console.log(`connected to DB ${conn.connection.host}`);
};
connectToDb();

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
