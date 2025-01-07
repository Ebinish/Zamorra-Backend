import mongoose from "mongoose";
import convertUtcToIst from '../timestamps/timestamps_convert.js';

const schema = new mongoose.Schema(
  {
    subcategoryName: {
      type: String,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories_mst",
      required: true,
    },
    subcategoryImage: {
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

const Subcategory = mongoose.model("subcategories_mst", schema, "subcategories_mst");

export { Subcategory };  
