import { getFoodByPk, getFoods, getFoodsByParams, createFood, updateFood } from "../controllers/food.controllers";
import { validateToken } from "../../config/middlewares/token.middleware";
import { Router } from "express";

const foodRouter = Router()

foodRouter.get('/', getFoods)
foodRouter.get('/params', getFoodsByParams)
foodRouter.get('/:id', getFoodByPk)
foodRouter.post('/', [validateToken, createFood])
foodRouter.put('/', [validateToken, updateFood])

export default foodRouter;
