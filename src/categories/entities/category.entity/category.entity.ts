import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm';
import { Product } from '../../../products/entities/entities/product.entity';


@Entity('categories')
export class Category {

@PrimaryGeneratedColumn()
id: number;

@Column({name: 'name', length: 100, unique: true})
name: string;   

@CreateDateColumn({name: 'created_at'})
createdAt: Date;    

@UpdateDateColumn({name: 'updated_at'})
updatedAt: Date;

@OneToMany(() => Product, (product) => product.category)
products: Product[];




}
