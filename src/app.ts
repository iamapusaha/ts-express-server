import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { pool } from "./db";
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

app.put("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, password, age, is_active } = req.body;
  try {
    const result = await pool.query(
      `
  UPDATE users
  SET 
  name =COALESCE($1,name),
  password =COALESCE($2,password),
  age =COALESCE($3,age),
  is_active =COALESCE($4,is_active)
  WHERE id = $5 RETURNING *

  `,
      [name, password, age, is_active, id],
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "user data not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "user update successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error.message",
      error: error,
    });
  }
});

app.delete("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `
  DELETE FROM users where id =$1
  `,
      [id],
    );
    console.log(result);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "user deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error.message",
      error: error,
    });
  }
});

export default app;
