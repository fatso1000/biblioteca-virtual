import { Request, Response, NextFunction } from "express";
import validateRequest from "../../../middlewares/validate-request";
import BookRepo from "../../../database/repos/BookRepo";
import schemas from "./schema";

export default class Repo {
  public static uploadBookSchema(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const schema = schemas.uploadBook;
    validateRequest(req, next, schema);
  }

  public static uploadBook(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.refreshToken;
    const ipAddress = req.ip;
    BookRepo.uploadBook(req.body, { token, ipAddress })
      .then((respuesta) => res.status(200).json({ msg: "Book uploaded", respuesta }))
      .catch(next);
  }
}
