import { ACTIVE } from "../../utils/constants/status"
import { AppDataSource } from "../../config/databases/typeorm"
import { UserEntity } from "../models/user.entity"
import bcrypt from 'bcrypt'

export class UserServices {

    async getUsers() {
        const users = await AppDataSource
            .getRepository(UserEntity)
            .createQueryBuilder('user')
            .where('user.status = :status', { status: ACTIVE })
            .getMany()

        return users
    }

    async getUserByUsername(username: string) {
        const user = await AppDataSource
            .getRepository(UserEntity)
            .createQueryBuilder('user')
            .select(['user.username', 'user.password'])
            .where('BINARY user.username = :username', { username })
            .getOneOrFail()

        return user;
    }

    async getUserByPk(user_id: number) {
        const user = await AppDataSource
            .getRepository(UserEntity)
            .createQueryBuilder('user')
            .where('user.user_id = :user_id', { user_id })
            .getOneOrFail()

        return user;
    }

    async hasPassword(password: string) {
        return await bcrypt.hash(password, 10)
    }

    async comparePassword(password: string, hash: string) {
        return await bcrypt.compare(password, hash)
    }

    async getUsersByParams(params: any) {
        const users = AppDataSource
            .getRepository(UserEntity)
            .createQueryBuilder('user')

        if (params.role) {
            users.andWhere('user.role = :role', { role: params.role })
        }

        if (params.status) {
            users.andWhere('user.status = :status', { status: params.status })
        }

        return await users.getMany();
    }

    async saveUser(data: any) {
        const user = await AppDataSource
            .createQueryBuilder()
            .insert()
            .into(UserEntity)
            .values([data])
            .orUpdate(['username', 'password', 'role', 'status'])
            .execute()

        return user;
    }

}



