import { logger } from "../src/configs/logger_config.js";
import User from "../src/models/user.js";
import mongoose from "mongoose";

async function logUser() {
  const data = await User.find({});
  return;
}

async function createTestUser() {
  const newUser = new User({
    full_name: "Srishty chourasiya",
    email: "srishty@gmail.com",
  });
  await newUser.save();
  return;
}

async function scriptRunner() {
  await logUser();
  // await createTestUser();
  return;
}

try {
  await mongoose.connect(process.env.MONGO_URI);
  await scriptRunner();
  await mongoose.disconnect();
} catch (error) {
  logger.error(error);
}
