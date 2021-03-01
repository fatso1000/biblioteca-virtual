import { Router } from "express";
import authorize from "../../../middlewares/authorize";
import { roles } from "../../../config";
import Repo from "./repo";

const router = Router();

router.post("/basic", Repo.uploadBookSchema, Repo.uploadBook);

export default router;
