import { ACTIVE } from "../../utils/constants/status"
import { AppDataSource } from "../../config/databases/typeorm"
import { FoodEntity } from "../models/food.entity"

export class FoodServices {

    async getFoods() {
        const foods = await AppDataSource
            .getRepository(FoodEntity)
            .createQueryBuilder('food')
            .leftJoinAndSelect('food.category', 'category')
            .select(['food', 'category.category_id', 'category.description'])
            .where('food.status = :status', { status: ACTIVE })
            .getMany()

        return foods
    }

    async getFoodByPk(food_id: number) {
        const food = await AppDataSource
            .getRepository(FoodEntity)
            .createQueryBuilder('food')
            .leftJoinAndSelect('food.category', 'category')
            .where('food.food_id = :food_id', { food_id })
            .getOneOrFail()

        return food;
    }

    async getFoodsByParams(params: any) {
        const foods = AppDataSource
            .getRepository(FoodEntity)
            .createQueryBuilder('food')
            .leftJoinAndSelect('food.category', 'category')
            .select(['food', 'category.category_id', 'category.description'])

        if (params.category) {
            foods.andWhere('food.category_id = :category_id', { category_id: params.category })
        }

        if (params.status) {
            foods.andWhere('food.status = :status', { status: params.status })
        }

        return await foods.getMany();
    }

    async saveFood(data: any) {
        const user = await AppDataSource
            .createQueryBuilder()
            .insert()
            .into(FoodEntity)
            .values([data])
            .orUpdate(['food_name', 'category', 'price', 'food_image', 'status'])
            .execute()

        return user;
    }

}



