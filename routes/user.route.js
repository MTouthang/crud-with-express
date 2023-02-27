import express from "express";
import {
  createProfile,
  deleteProfile,
  fetchProfile,
  getProfileById,
  home,
  updateProfile,
} from "../controllers/user.controller.js";
const router = express.Router();

router.route("/create/profile").post(createProfile);
router.route("/fetch/profile").get(fetchProfile);
router.route("/fetch/profile/:id").get(getProfileById);
router.route("/profile/delete/:id").delete(deleteProfile);
router.route("/profile/update/:id").put(updateProfile);
router.route("/").get(home);

export default router;
