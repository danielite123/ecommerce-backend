import mongoose, { Schema } from "mongoose";

const generateAvatar = (username = "user") => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    username
  )}&background=random&color=ffffff&bold=true`;
};

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      required: true,
      minlength: [3, "username must be 3 letter long"],
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      minlength: [8, "password must be 8 letter long"],
    },

    profile_img: {
      type: String,
      default: function () {
        return generateAvatar(this.username);
      },
    },

    role: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
    },

    blogs: {
      type: [Schema.Types.ObjectId],
      ref: "blogs",
      default: [],
    },

    products: {
      type: [Schema.Types.ObjectId],
      ref: "products",
      default: [],
    },

    cart: {
      type: [Schema.Types.ObjectId],
      ref: "products",
      default: [],
    },

    orders: {
      type: [Schema.Types.ObjectId],
      ref: "orders",
      default: [],
    },

    google_auth: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "joinedAt",
    },
  }
);

export default mongoose.model("users", userSchema);
