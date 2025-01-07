import express from "express";
import mongoose from "mongoose";
import config from './config/app-config.js';

const { DB_URL, PORT, APP_SECRET } = config;

import cors from "cors";
import validator from "./utils/validator.js";
import routers from "./routes/app-routes.js";
import cookieParser from "cookie-parser";
import sessions from "express-session";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

process.on("uncaughtException", function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});

let appStartUperror = validator.validateRoutes(routers);

if (appStartUperror.length !== 0) {
  console.log(appStartUperror);
  process.exit();
}

mongoose.set('strictQuery', false);
mongoose.Promise = global.Promise;

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Database can't be connected: " + error);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicDir = join(__dirname, "uploads");

app.use(cors("*"));

app.use("/uploads", express.static(publicDir));


app.get("/", async (req, res, next) => {
  try {
    res.status(200).json({
      applicationName: "STREET BAZAAR SERVER",
      status: "Up",
      date: new Date(),
    });
  } catch (error) {
    next(error);
  }
});

const oneDay = 1000 * 60 * 60 * 24;

app.use(
  sessions({
    secret: APP_SECRET,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

app.use(cookieParser());

app.use(express.static('public'));

app.use(routers);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
}).on("error", (err) => {
  console.log(err);
  process.exit();
});
