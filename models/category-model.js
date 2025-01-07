import mongoose from "mongoose";
import convertUtcToIst from '../timestamps/timestamps_convert.js';

const schema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    categoryImage: {
      type: String,
    },
    status: {
      type: Boolean,
      default: 1,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
    timestamps: {
      currentTime: () => convertUtcToIst(new Date())
    }
  }
);

const category = mongoose.model("categories_mst", schema, "categories_mst");

export { category };  
