import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import auth from "./middleware/auth";
import logger from "./middleware/logger";
import { authRouter } from "./modules/auth/auth.route";
import { profileRouter } from "./modules/profile/profile.router";
import { userRouter } from "./modules/user/user.route";

const app: Application = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());
app.use(logger);
app.use("/api/users", auth(), userRouter);
app.use("/api/profile", profileRouter);
app.use("/api/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "server up to date",
    author: "Apu Saha",
  });
});

export default app;
