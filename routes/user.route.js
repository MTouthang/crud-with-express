import express from "express";
import {
  createProfile,
  deleteProfile,
  fetchProfiles,
  getProfileById,
  updateProfile,
} from "../controllers/user.controller.js";
const router = express.Router();

router.route("/users").get(fetchProfiles);
router.route("/users").post(createProfile);
router.route("/users/:id").get(getProfileById);
router.route("/users/:id").delete(deleteProfile);
router.route("/users/:id").put(updateProfile);

export default router;
