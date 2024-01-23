import { Request, Response } from "express"
import { FoodServices } from "../services/food.services"

const foodServices = new FoodServices()

export const getFoods = async (request: Request, response: Response) => {
    try {
        let data = await foodServices.getFoods()

        return response.json({
            ok: true,
            data
        })
    } catch (error: any) {
        return response.json({
            ok: false,
            error: error.message
        })
    }
}

export const getFoodByPk = async (request: Request, response: Response) => {
    try {
        let food_id = Number(request.params.id)
        let data = await foodServices.getFoodByPk(food_id)

        return response.json({
            ok: true,
            data
        })
    } catch (error: any) {
        return response.json({
            ok: false,
            error: error.message
        })
    }
}

export const getFoodsByParams = async (request: Request, response: Response) => {
    try {
        let params = request.body
        let data = await foodServices.getFoodsByParams(params)

        return response.json({
            ok: true,
            data
        })
    } catch (error: any) {
        return response.json({
            ok: false,
            error: error.message
        })
    }
}

export const createFood = async (request: Request, response: Response) => {
    try {
        let params = request.body

        if (!params.food_name || !params.price) { 
            throw Error("No se han enviado todos los datos")
        }

        let data = await foodServices.saveFood(params)
        return response.json({
            ok: true,
            data
        })
    } catch (error: any) {
        return response.json({
            ok: false,
            error: error.message
        })
    }
}

export const updateFood = async (request: Request, response: Response) => {
    try {
        let params = request.body
        let data = await foodServices.saveFood(params)

        return response.json({
            ok: true,
            data
        })
    } catch (error: any) {
        return response.json({
            ok: false,
            error: error.message
        })
    }
}