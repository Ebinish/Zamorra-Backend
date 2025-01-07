import express from "express";
import categoryController from "../controllers/categories-controller.js"; // Ensure correct path
import subcategoryController from "../controllers/subcategories-controller.js"; // Ensure correct path


const router = express.Router();


router.post("/category", categoryController.create);
router.get("/category", categoryController.findAll);
router.get("/category/:id", categoryController.findOne);
router.put("/category/:id", categoryController.update);
router.delete("/category/:id", categoryController.delete);

router.post("/subcategory", subcategoryController.create);
router.get("/subcategory", subcategoryController.findAll);
router.get("/subcategory/:id", subcategoryController.findOne);
router.put("/subcategory/:id", subcategoryController.update);
router.delete("/subcategory/:id", subcategoryController.delete);

export default router;
