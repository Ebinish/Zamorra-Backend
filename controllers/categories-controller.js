import categoriesService from "../services/categories-service.js";
import { upload } from "../middleware/category-upload.js";
import { delFile } from "../utils/fileSystem.js";

const categoryUpload = upload.fields([
  { name: "categoryImage", maxCount: 1 },
]);

export const create = (req, res, next) => {
  categoryUpload(req, res, function (err) {
    if (err) {
      next(err);
    } else {
      req.body.categoryImage = req.files["categoryImage"][0].path.replace(/\\/g, '/');
      categoriesService.createCategory(req.body, (error, results) => {
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
    categoryName: req.query.categoryName,
  };
  categoriesService.getCategories(model, (error, results) => {
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
    categoryId: req.params.id,
  };
  categoriesService.getCategoryById(conditionParams, (error, results) => {
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
    categoryUpload(req, res, async function (err) {
      if (err) {
        return next(err); 
      }

      const updatedCategory = req.body;
      updatedCategory.id = req.params.id;

      if (req.files && req.files.categoryImage) {
        updatedCategory.categoryImage = req.files["categoryImage"][0].path.replace(/\\/g, '/');
      }
      //  else {
      //   updatedCategory.categoryImage = updatedCategory.categoryImage || req.body.categoryImage;
      // }
      const result = await categoriesService.updateCategory(updatedCategory);
      if(updatedCategory.categoryImage){
        if (updatedCategory.categoryImage !== result.categoryImage) {
          console.log(updatedCategory,8989)
          delFile(result.categoryImage); 
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
    categoryId: req.params.id,
  };
  categoriesService.deleteCategory(conditionParams, (error, results) => {
    if (error) {
      return next(error);
    } else {
      console.log(results.categoryImage, 22323);
      if (results.categoryImage) {
        delFile(results.categoryImage);
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
