import { category } from "../models/category-model.js";
import validator from "../utils/validator.js";
import { categoryRequestToParams } from "../utils/convertionUtil.js";

async function createCategory(params, callback) {
  params = categoryRequestToParams(params, []);
  const Category = new category(params);
  validator.validateModel(Category, callback);

  Category
    .save()
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}


async function getCategories(params, callback) {
  const categoryName = params.categoryName;
  const condition = {};

  if (categoryName) {
    condition["categoryName"] = {
      $regex: new RegExp(categoryName),
      $options: "i",
    };
  }

  try {
    const response = await category.find(condition);
    return callback(null, response);
  } catch (error) {
    return callback(error);
  }
}

async function getCategoryById(params, callback) {
  const categoryId = params.categoryId;
  const condition = {};

  try {
    const response = await category.findById(categoryId, condition);
    if (!response) {
      callback("Not Found Category with Id" + categoryId);
    } else {
      callback(null, response);
    }
  } catch (error) {
    return callback(error);
  }
}

async function updateCategory(params) {
  try {
    const categoryId = params.id;
    const categoryToUpdate = await category.findById(categoryId);

    if (!categoryToUpdate) {
      throw new Error("Category not found with ID: " + categoryId);
    }

    params = categoryRequestToParams(params, categoryToUpdate);

    const updatedCategory = await category.findByIdAndUpdate(categoryId, params, {
      // new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    return updatedCategory;
  } catch (error) {
    throw error;
  }
}


async function deleteCategory(params, callback) {
  const categoryId = params.categoryId;

  try {
    const response = await category.findByIdAndDelete(categoryId);
    if (!response) {
      callback("Not Found Category with Id" + categoryId);
    } else {
      callback(null, response);
    }
  } catch (error) {
    return callback(error);
  }
}


export default {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
