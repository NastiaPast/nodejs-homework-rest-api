import Joi from 'joi';
import { subscriptionList, emailRegexp } from "../constants/user-constants.js";

const userAuthSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required(),
});
const userEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  })

export default {
  userAuthSchema,
  updateSubscriptionSchema,
  userEmailSchema,
};
