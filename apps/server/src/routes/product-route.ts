import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/product-controller";
import { authMiddleware, authorizeAdmin } from "../middlewares/auth-middleware";

const router = Router();

router.post("/", authMiddleware, authorizeAdmin, createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", authMiddleware, authorizeAdmin, updateProduct);
router.delete("/:id", authMiddleware, authorizeAdmin, deleteProduct);

export default router;
