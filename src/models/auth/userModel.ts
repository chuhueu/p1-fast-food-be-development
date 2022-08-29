import mongoose from "mongoose";
const bcrypt = require("bcryptjs");
const findOrCreate = require("mongoose-findorcreate");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
    phone: { type: String },
    googleID: { type: String },
    facebookID: { type: String },
    appleID: { type: String },
    avatar: {
      type: String,
      default:
        "https://cdn5.vectorstock.com/i/1000x1000/70/59/man-flat-avatar-on-white-background-vector-15647059.jpg",
    },
    addressDefault: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Role",
      default: "62fcbf1d8713bdad3fa19e5e",
    },
    role: {
      type: String,
      default: "ROLE_MEMBER",
      enum: ["ROLE_MEMBER", "ROLE_ADMIN"],
    },
  },
  { timestamps: true }
);

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", UserSchema);
