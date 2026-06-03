import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { Pool } from "pg";
import config from "./config";

const pool = new Pool({
  connectionString: config.connection_string,
});

const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(20),
      email VARCHAR(20) UNIQUE NOT NULL,
      password VARCHAR(20) NOT NULL,
      is_active BOOLEAN DEFAULT true,
      age INT,
      create_at TIMESTAMP DEFAULT NOW(),
      update_at TIMESTAMP DEFAULT NOW()
      )
      `);
    // console.log("database connected successfully");
  } catch (error) {
    console.log(error);
  }
};
initDB();
const app: Application = express();

const port = config.port;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "server up to date",
    author: "Apu Saha",
  });
});
app.post("/api/users", async (req: Request, res: Response) => {
  const { name, email, password, age } = req.body;
  try {
    const result = await pool.query(
      `
    INSERT INTO users(name,email,password,age) VALUES($1,$2,$3,$4)
      RETURNING *
    `,
      [name, email, password, age],
    );
    console.log(result);
    res.status(201).json({
      message: "data create successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
});

app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT * FROM users
      `);
    res.status(200).json({
      success: true,
      message: "user retrive successfully",
      data: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error.message",
      error: error,
    });
  }
});

app.get("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `
        SELECT * FROM users WHERE id = $1
      `,
      [id],
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "user data not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "user retrive successfully",
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

app.listen(port, () => {
  console.log(`Our server live on port ${port}`);
});
