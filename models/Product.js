import mongoose, { Schema } from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      index: true,
    },

    brand: {
      type: String,
      required: true,
      index: true,
    },

    price: {
      type: Number,
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
      required: true,
    },

    status: {
      type: Boolean,
      default: true,
    },

    colors: [String],

    discount: Number,

    imageUrls: [String],

    specifications: [
      {
        title: { type: String, required: true },
        attributes: [
          {
            key: { type: String, required: true },
            value: { type: String, required: true },
          },
        ],
      },
    ],

    shippingOptions: [
      {
        method: { type: String, required: true },
        cost: { type: Number, required: true },
        estimatedTime: { type: String },
      },
    ],

    warranty: {
      period: { type: String },
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      //   required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("products", productSchema);
