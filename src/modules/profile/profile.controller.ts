import type { Request, Response } from "express";
import { ProfileService } from "./profile.service";

const createProfile = async (req: Request, res: Response) => {
  try {
    const result = await ProfileService.createProfileInToDB(req.body);
    res.status(201).json({
      success: true,
      message: "profile create successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
};

export const profileController = {
  createProfile,
};
