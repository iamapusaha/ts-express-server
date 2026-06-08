import type { Request, Response } from "express";
import { authService } from "./auth.service";

const authController = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUserInToDB(req.body);
    res.status(201).json({
      success: true,
      message: "user login successfully",
      result: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
};

export const loginUser = {
  authController,
};
