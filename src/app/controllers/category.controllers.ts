import { Request, Response } from "express"
import { CategoryServices } from "../services/category.services"

const categoryServices = new CategoryServices()

export const getCategories = async (request: Request, response: Response) => {
    try {
        let data = await categoryServices.getCategories()

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

export const getCategoryByPk = async (request: Request, response: Response) => {
    try {
        let category_id = Number(request.params.id)
        let data = await categoryServices.getCategoryByPk(category_id)

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

export const getCategoriesByParams = async (request: Request, response: Response) => {
    try {
        let params = request.body
        let data = await categoryServices.getCategoriesByParams(params)

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

export const createCategory = async (request: Request, response: Response) => {
    try {
        let params = request.body

        if (!params.description) { 
            throw Error("No se han enviado todos los datos")
        }

        let data = await categoryServices.saveCategory(params)
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

export const updateCategory = async (request: Request, response: Response) => {
    try {
        let params = request.body
        let data = await categoryServices.saveCategory(params)

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