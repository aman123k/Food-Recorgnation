import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  picture: { type: String },
  name: { type: String, required: true },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  height: { type: Number },
  weight: { type: Number },
  dailyCalorieGoal: { type: Number },
  allergies: { type: [String] },
  intolerances: { type: [String] },
  favoriteFoods: { type: [String] },
  dislikedFoods: { type: [String] },
  mealHistory: { type: Array },
  progress: { type: Object },
});

export default mongoose.model("User", userSchema);
