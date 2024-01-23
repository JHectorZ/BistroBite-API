import { ACTIVE } from "../../utils/constants/status"
import { AppDataSource } from "../../config/databases/typeorm"
import { CategoryEntity } from "../models/category.entity"

export class CategoryServices {

    async getCategories() {
        const categories = await AppDataSource
            .getRepository(CategoryEntity)
            .createQueryBuilder('category')
            .where('category.status = :status', { status: ACTIVE })
            .getMany()

        return categories
    }

    async getCategoryByPk(category_id: number) {
        const category = await AppDataSource
            .getRepository(CategoryEntity)
            .createQueryBuilder('category')
            .leftJoinAndSelect("category.foods", "foods")
            .where('category.category_id = :category_id', { category_id })
            .getOneOrFail()

        return category;
    }

    async getCategoriesByParams(params: any) {
        const categories = AppDataSource
            .getRepository(CategoryEntity)
            .createQueryBuilder('category')

        if (params.status) {
            categories.andWhere('category.status = :status', { status: params.status })
        }

        return await categories.getMany();
    }

    async saveCategory(data: any) {
        const user = await AppDataSource
            .createQueryBuilder()
            .insert()
            .into(CategoryEntity)
            .values([data])
            .orUpdate(['description', 'status'])
            .execute()

        return user;
    }


}



