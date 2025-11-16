import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);

const userSchema = new Schema({
  username: String,
  hashedPassword: String,
  records: [{
    date: String,
    totalStudyDuration: Number,
    subjects: [{
      subject: String,
      duration: Number
    }]
  }],
  tokens: [String],
});

const User = mongoose.model("User", userSchema);

export { User };
