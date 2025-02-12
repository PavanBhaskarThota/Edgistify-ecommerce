import { Request, Response } from "express";
import UserServices from "../Services/UserServices";

class UserController {
  async create(req: Request, res: Response) {
    try {
      const { user } = req.body;
      console.log(req.body)
      console.log(user)

      if (user === undefined) {
        res.status(200).send({message:"User is required"});
      }
      const result = await UserServices.create(user);
      console.log(result);

      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { user } = req.body;
      console.log(req.body)
      console.log(user)
      if (user === undefined) {
        throw new Error("User is required");
      }
      const result = await UserServices.login(user);

      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new UserController();
