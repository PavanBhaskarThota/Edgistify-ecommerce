import jwt from "jsonwebtoken";
import "dotenv/config";

const secret = process.env.JWT_KEY as string;
export const auth = async (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, secret);
    req.user = decodedToken;
    req.token = token;

    next();
  } catch (error) {
    res.status(401).send({ message: "Unauthorized", error });
  }
};
