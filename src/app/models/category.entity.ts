import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { FoodEntity } from "./food.entity"

@Entity("catalog_categories")
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    category_id!: number

    @Column()
    description!: string

    @Column({default: 1})
    status!: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    dateRegister!: Date;

    @OneToMany(() => FoodEntity, (food) => food.category)
    foods!: FoodEntity[]
}