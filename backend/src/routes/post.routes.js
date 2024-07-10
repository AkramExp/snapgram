import { Router } from "express";
import {
  createPost,
  getRecentPosts,
  getSavedPosts,
  toggleLikePost,
  toggleSave,
} from "../controllers/post.controller.js";
import { upload } from "../middleware/multer.middleawre.js";
import { verifyUser } from "../middleware/user.middleware.js";

const postRouter = Router();

postRouter.post("/create", upload.single("file"), verifyUser, createPost);

postRouter.get("/recent-posts", getRecentPosts);

postRouter.post("/toggle-save/:postId", verifyUser, toggleSave);

postRouter.get("/saved-posts", verifyUser, getSavedPosts);

postRouter.post("/toggle-like/:postId", verifyUser, toggleLikePost);

export default postRouter;
