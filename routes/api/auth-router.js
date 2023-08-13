import express from "express";
import authController from "../../controllers/auth-controller.js";
import { validateBody } from "../../decorators/index.js";
import usersSchemas from "../../schemas/users-schemas.js";
import { authenticate, isEmptyBody } from "../../middlewars/index.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(usersSchemas.userAuthSchema),
  authController.register
);

authRouter.post(
  "/login",
  validateBody(usersSchemas.userAuthSchema),
  authController.login
);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.logout);

authRouter.patch(
  "/",
  authenticate,
  isEmptyBody,
  validateBody(usersSchemas.updateSubscriptionSchema),
  authController.updateSubscription
);

export default authRouter;
