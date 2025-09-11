import mongoose from "mongoose";
import { logger } from "../configs/loggerConfig.js";

const userSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    full_name: { type: String, required: true, trim: true },
    dob: { type: Date, required: false },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (!this._id) {
    this._id = new mongoose.Types.ObjectId();
  }
  logger.debug(`Document about to save: ${JSON.stringify(this.toObject())}`);
  next();
});

userSchema.pre(new RegExp(/^find$/), function (next) {
  logger.debug(this.getQuery());
  next();
});

userSchema.post("save", function (docs, next) {
  logger.debug(`Document saved: ${docs}`);
});

userSchema.post(new RegExp(/^find$/), function (docs, next) {
  logger.debug(`Documents found: ${docs}`);
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
