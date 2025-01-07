import subCategoriesService from "../services/subcategories-service.js";
import { upload } from "../middleware/subcategory-upload.js";
import { delFile } from "../utils/fileSystem.js";

const SubcategoryUpload = upload.fields([
  { name: "subcategoryImage", maxCount: 1 },
]);

export const create = (req, res, next) => {
  SubcategoryUpload(req, res, function (err) {
    if (err) {
      next(err);
    } else {
      req.body.subcategoryImage = req.files["subcategoryImage"][0].path.replace(/\\/g, '/');
      subCategoriesService.createSubcategory(req.body, (error, results) => {
        if (error) {
          return res.status(200).send({
            message: "Failed",
            data: error,
          });
        } else {
          // console.log(results,893)
          return res.status(200).send({
            message: "Success",
            data: results,
          });
        }
      });
    }
  });
};

export const findAll = (req, res, next) => {
  const model = {
    subcategoryName: req.query.subcategoryName,
    categoryId: req.query.categoryId,
  };
  subCategoriesService.getSubCategories(model, (error, results) => {
    if (error) {
      return next(error);
    } else {
      return res.status(200).send({
        message: "Success",
        data: results,
      });
    }
  });
};

export const findOne = (req, res, next) => {
  const conditionParams = {
    subcategoryId: req.params.id,
  };
  subCategoriesService.getSubCategoryById(conditionParams, (error, results) => {
    if (error) {
      return next(error);
    } else {
      return res.status(200).send({
        message: "Success",
        data: results,
      });
    }
  });
};

export const update = async (req, res, next) => {
  try {
    SubcategoryUpload(req, res, async function (err) {
      if (err) {
        return next(err);
      }

      const updatedSubCategory = req.body;
      updatedSubCategory.id = req.params.id;

      if (req.files && req.files.subcategoryImage) {
        updatedSubCategory.subcategoryImage = req.files["subcategoryImage"][0].path.replace(/\\/g, '/');
      }
      //  else {
      //   updatedSubCategory.subcategoryImage = updatedSubCategory.subcategoryImage || req.body.subcategoryImage;
      // }
      const result = await subCategoriesService.updateSubCategory(updatedSubCategory);
      if (updatedSubCategory.subcategoryImage) {
        if (updatedSubCategory.subcategoryImage !== result.subcategoryImage) {
          console.log(updatedSubCategory, 8989)
          delFile(result.subcategoryImage);
        }
      }
      return res.status(200).send({
        message: "Success",
        data: result,
      });
    });
  } catch (error) {
    return res.status(500).send({
      message: "Failed",
      data: error.message,
    });
  }
};





export const deleteCategory = (req, res, next) => {
  const conditionParams = {
    subcategoryId: req.params.id,
  };
  subCategoriesService.deleteSubCategory(conditionParams, (error, results) => {
    if (error) {
      return next(error);
    } else {
      if (results.subcategoryImage) {
        delFile(results.subcategoryImage);
      }
      return res.status(200).send({
        message: "Success",
        data: results,
      });
    }
  });
};



export default {
  create,
  findAll,
  findOne,
  update,
  delete: deleteCategory,
};
