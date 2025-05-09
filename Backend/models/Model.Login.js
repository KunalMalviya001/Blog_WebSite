import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const loginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// Hash password before saving
loginSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
})

// Compare password method
loginSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};


const ModelLogin = mongoose.model("Login", loginSchema);
export default ModelLogin;
