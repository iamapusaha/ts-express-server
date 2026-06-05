import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { userRouter } from "./modules/user/user.route";

const app: Application = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());
app.use("/api/users", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "server up to date",
    author: "Apu Saha",
  });
});

export default app;
