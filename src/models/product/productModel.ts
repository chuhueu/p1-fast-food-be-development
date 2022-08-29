import mongoose from "mongoose";
const slug = require("mongoose-slug-generator");

const options = {
  separator: "-",
  lang: "en",
  truncate: 120,
};

mongoose.plugin(slug, options);

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, slug: "name", unique: true },
    image: { type: String, required: true },
    desc: { type: String },
    price: { type: Number, required: true },
    rate: { type: Number, required: true },
    country: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    productType: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "ProductType",
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    // size: { type: Array },
    // colour: { type: Array },
    // type: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
