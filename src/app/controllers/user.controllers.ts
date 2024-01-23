import { Request, Response } from "express"
import { UserServices } from "../services/user.services"
import Token from "../../config/token"

const userServices = new UserServices()

export const getUsers = async (request: Request, response: Response) => {
    try {
        let data = await userServices.getUsers()

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

export const getUserByPk = async (request: Request, response: Response) => {
    try {
        let user_id = Number(request.params.id)
        let data = await userServices.getUserByPk(user_id)

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

export const login = async (request: Request, response: Response) => {
    try {
        const params = request.body
        
        const user: any = await userServices.getUserByUsername(params.username)
        const isLogin = await userServices.comparePassword(params.password, user.password)

        if (!isLogin){
            throw Error;
        }
        
        user.token = Token.getJwtToken(user)
        user.password = undefined

        return response.json({
            ok: true,
            user
        })
    } catch (error: any) {
        return response.json({
            ok: false,
            error: "usuario/contraseña incorrectos"
        })
    }
}

export const getUsersByParams = async (request: Request, response: Response) => {
    try {
        let params = request.body
        let data = await userServices.getUsersByParams(params)

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

export const createUser = async (request: Request, response: Response) => {
    try {
        let params = request.body

        if (!params.username || !params.password) { 
            throw Error("No se han enviado todos los datos")
        }

        let hash = await userServices.hasPassword(params.password)
        params.password = hash

        let data = await userServices.saveUser(params)

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

export const updateUser = async (request: Request, response: Response) => {
    try {
        let params = request.body
        let data = await userServices.saveUser(params)

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