import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service";
import { userBodySchema, userParamsSchema } from "./user.schema";
import { apiResponse } from "../../shared/apiResponse";

const userService = new UserService();

export class UserController {
  static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = userBodySchema.parse(req.body);
      const user = await userService.createUser(validated);
      res.status(201).json(apiResponse(true, "User created", user));
    } catch (err) {
      next(err);
    }
  }

  static async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getUsers();
      res.status(200).json(apiResponse(true, "Users fetched", users));
    } catch (err) {
      next(err);
    }
  }

  static async updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const validatedParams = userParamsSchema.parse(req.params);
      const validatedBody = userBodySchema.parse(req.body);
      const user = await userService.updateUser(validatedParams, validatedBody);
      res.status(200).json(apiResponse(true, "User updated", user));
    } catch (err) {
      next(err);
    }
  }

  static async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const validatedParams = userParamsSchema.parse(req.params);
      await userService.deleteUser(validatedParams);
      res.status(200).json(apiResponse(true, "User deleted"));
    } catch (err) {
      next(err);
    }
  }
}
