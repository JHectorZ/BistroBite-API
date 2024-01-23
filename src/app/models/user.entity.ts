import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { FoodEntity } from "./food.entity"

@Entity("catalog_user")
export class UserEntity {
    @PrimaryGeneratedColumn()
    user_id!: number

    @Column()
    username!: string

    @Column()
    role!: number

    @Column()
    password!: string

    @Column({default: 1})
    status!: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    dateRegister!: Date;
}