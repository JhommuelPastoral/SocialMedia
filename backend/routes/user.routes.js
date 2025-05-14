import express from "express";
import protectedRoute from "../middleware/auth.middleware.js";
import { getRecommendedFriends,addFriend } from "../controllers/user.controllers.js";

const userRoutes =  (io) => {
  
  const router = express.Router();
  router.use(protectedRoute)
  router.get("/",protectedRoute, (req, res) => getRecommendedFriends(req, res, io));
  router.post("/addfriend/:id",protectedRoute, (req, res) => addFriend(req, res, io));
  return router;

}

export default userRoutes;