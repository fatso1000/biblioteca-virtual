import { Router } from "express";
import signup from "./access/signup";
import login from "./access/login";
import verifyEmail from "./access/verify-email";
import profile from "./profile/user";
import bookUpload from "./books/uploadBook";

const router = Router();

/*-------------------------------------------------------------------------*/
// Below all APIs are public APIs protected by api-key
// router.use('/', apikey);
/*-------------------------------------------------------------------------*/

router.use("/signup", signup);
router.use("/login", login);
router.use("/verify-email", verifyEmail);
router.use("/profile", profile);
router.use("/book-upload", bookUpload);

export default router;
