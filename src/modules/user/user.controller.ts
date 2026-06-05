import type { Request, Response } from "express";
import { UserService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.createUserInToDB(req.body);
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
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUserFromDB();
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
};

const getSingleUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const result = await UserService.getSingleUserFromDB(id);
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
};
export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
};
