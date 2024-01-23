import { DataSource } from "typeorm"
import dotenv from "../dotenv"
dotenv.config

import { FoodEntity,  } from "../../app/models/food.entity"
import { CategoryEntity } from "../../app/models/category.entity"
import { UserEntity } from "../../app/models/user.entity"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: Number(process.env.DATABASE_PORT), 
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    // synchronize: true,
    logging: true,
    entities: [
        FoodEntity,
        CategoryEntity,
        UserEntity,
    ],
    subscribers: [],
    migrations: [],
})