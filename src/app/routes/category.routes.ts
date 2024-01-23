import { getCategories, getCategoryByPk, getCategoriesByParams, updateCategory, createCategory } from "../controllers/category.controllers";
import { validateToken } from "../../config/middlewares/token.middleware";
import { Router } from "express";

const categoryRouter = Router()

categoryRouter.get('/', getCategories)
categoryRouter.get('/params', getCategoriesByParams)
categoryRouter.get('/:id', getCategoryByPk)
categoryRouter.post('/', [validateToken, createCategory])
categoryRouter.put('/', [validateToken, updateCategory])

export default categoryRouter;
