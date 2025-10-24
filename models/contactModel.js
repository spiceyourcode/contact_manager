import mongoose from "mongoose";

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a contact name"],
    },
    email: {
      type: String,
      required: [true, "Please add your Email address"],
      unique: [true, "Email already taken"],
    },
    phone: {
      type: String,
      required: [true, "Please add your phone number "],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);