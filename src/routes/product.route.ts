import { Router } from "express";
import { validateRequestParams } from "../middlewares/validation.middleware";
import { IDSchmea } from "../validations/auth.schema";
import {
    createProductController, deleteProductController, getAllProductsController,
    getProductByIdController,
    updateProductController
} from "../controllers/product.controller";
const router = Router()

//get all product list
router.get(
    '/',
    getAllProductsController
)
//get product by id
router.get(
    '/:id',
    validateRequestParams(IDSchmea),
    getProductByIdController
)

//create prpduct 
router.post(
    '/create',
    createProductController
)
//update
router.put(
    "/:id",
    validateRequestParams(IDSchmea),
    updateProductController
)
//delete
router.delete(
    "/:id",
    validateRequestParams(IDSchmea),
    deleteProductController
)
export default router;