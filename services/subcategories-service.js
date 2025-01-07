import { Subcategory } from "../models/subcategory-model.js";
import validator from "../utils/validator.js";
import { subcategoryRequestToParams } from "../utils/convertionUtil.js";

async function createSubcategory(params, callback) {
  params = subcategoryRequestToParams(params, []);
  const SubcategoryModel = new Subcategory(params);
  validator.validateModel(SubcategoryModel, callback);

  SubcategoryModel
    .save()
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}


async function getSubCategories(params, callback) {
  const subcategoryName = params.subcategoryName;
  const categoryId = params.categoryId;

  const condition = {};

  if (subcategoryName) {
    condition["subcategoryName"] = {
      $regex: new RegExp(subcategoryName),
      $options: "i",
    };
  }
  if (categoryId) {
    condition["categoryId"] = categoryId;
  }
  try {
    const response = await Subcategory.find(condition)
      .populate({
        path: "categoryId"
      });
    return callback(null, response);
  } catch (error) {
    return callback(error);
  }
}

async function getSubCategoryById(params, callback) {
  const subcategoryId = params.subcategoryId;
  const condition = {};

  try {
    const response = await Subcategory.findById(subcategoryId, condition);
    if (!response) {
      callback("Not Found SubcategoryModel with Id" + subcategoryId);
    } else {
      callback(null, response);
    }
  } catch (error) {
    return callback(error);
  }
}

async function updateSubCategory(params) {
  try {
    const subcategoryId = params.id;
    const subcategoryToUpdate = await Subcategory.findById(subcategoryId);

    if (!subcategoryToUpdate) {
      throw new Error("SubcategoryModel not found with ID: " + subcategoryId);
    }

    params = subcategoryRequestToParams(params, subcategoryToUpdate);

    const updatedSubCategory = await Subcategory.findByIdAndUpdate(subcategoryId, params, {
      // new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    return updatedSubCategory;
  } catch (error) {
    throw error;
  }
}


async function deleteSubCategory(params, callback) {
  const subcategoryId = params.subcategoryId;

  try {
    const response = await Subcategory.findByIdAndDelete(subcategoryId);
    if (!response) {
      callback("Not Found SubcategoryModel with Id" + subcategoryId);
    } else {
      callback(null, response);
    }
  } catch (error) {
    return callback(error);
  }
}


export default {
  createSubcategory,
  getSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
};
