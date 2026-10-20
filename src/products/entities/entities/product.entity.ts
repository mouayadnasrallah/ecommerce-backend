import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Check, ManyToOne, JoinColumn } from "typeorm";
import { Category } from "../../../categories/entities/category.entity/category.entity";

@Entity('products')
@Check('CHK_product_price_nonnegative', '"price" >= 0')
@Check('CHK_product_quantity_nonnegative', '"quantity" >= 0')
export class Product {

@PrimaryGeneratedColumn('uuid')
id: string;

@Column({name: 'name', length: 100})
name: string;

@Column({name: 'price', type: 'decimal', precision: 10, scale: 2, transformer: {
    to: (value: number) => value,
    from: (value: string) => parseFloat(value)
}})
price: number;

@Column({name: 'description', type: 'text', nullable: true})
description?: string | null;

@CreateDateColumn({name: 'created_at'})
createdAt: Date;

@UpdateDateColumn({name: 'updated_at'})
updatedAt: Date;

@Column({name: 'quantity', type: 'int', default: 0})
quantity: number;

@ManyToOne(() => Category, (category) => category.products,{
    nullable: false,
    onDelete: 'RESTRICT'
}) 
@JoinColumn({name: 'category_id'})

category: Category;

}
