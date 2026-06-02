import express, {
  type Application,
  type Request,
  type Response,
} from "express";
const app: Application = express();
const port = 5000;
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "server up to date",
    author: "Apu Saha",
  });
});
app.post("/", (req: Request, res: Response) => {
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Our server live on port ${port}`);
});
