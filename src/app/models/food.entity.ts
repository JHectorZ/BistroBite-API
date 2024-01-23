import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm"
import { CategoryEntity } from "./category.entity"

@Entity("catalog_foods")
export class FoodEntity {
    @PrimaryGeneratedColumn()
    food_id!: number

    @ManyToOne(() => CategoryEntity, (category) => category.foods)
    @JoinColumn({ name: "category_id" })
    category!: CategoryEntity;

    @Column()
    food_name!: string

    @Column()
    food_image!: string

    @Column('decimal', { precision: 6, scale: 2 })
    price!: number

    @Column({ default: 1 })
    status!: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    dateRegister!: Date;
}