import { ConflictException, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto/create-product.dto';
import { Category } from '../categories/entities/category.entity/category.entity';
import { UpdateProductDto } from './dto/update-product.dto/update-product.dto';

@Injectable()
export class ProductsService {

    constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    ){}                                                      
    
    
    async create(dto: CreateProductDto): Promise<Product> {
    const existingProduct = await this.productRepository.findOne({ where: { name: dto.name } });
    if (existingProduct) {
        throw new ConflictException(`Product with name "${dto.name}" already exists.`);
    }
    const Category = await this.categoryRepository.findOne({ where: { id: dto.categoryId } });
    if(!Category) {
        throw new NotFoundException(`Category with ID ${dto.categoryId} is not found.`);
    }
    const product = this.productRepository.create({
        name: dto.name,
        price: dto.price,
        description: dto.description,
        quantity: dto.quantity,
        category: Category,
    });
        return this.productRepository.save(product);
    }

    async findAll(): Promise<Product[]> {
        return this.productRepository.find({
            order: {createdAt: 'DESC'},
            relations: { category: true },
        });
    }

    async findOne(id: string): Promise<Product> {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: { category: true },
        });
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} is not found.`);
        }
        return product; 
    }

    async update(id: string, dto: UpdateProductDto): Promise<Product> {
     const product = await this.productRepository.findOne({
            where: { id },
        })
        if(Object.keys(dto).length === 0){
            throw new BadRequestException('No fields provided for update.');
        }

        if(!product){
            throw new NotFoundException(`Product with ID ${id} is not found.`);
        }

        if(dto.categoryId !== undefined){
            const category = await this.categoryRepository.findOne({ where: { id: dto.categoryId }})
        
            if(!category){
            throw new NotFoundException(`Category with ID ${dto.categoryId} is not found.`)
        }

        product.category = category;
        
    }   

    
    
    if(dto.name !== undefined){
        product.name = dto.name
    }
    if(dto.price !== undefined){
        product.price = dto.price
    }
    if(dto.quantity !== undefined){
        product.quantity = dto.quantity
    }
    if(dto.description !== undefined){
        product.description = dto.description
    }
    await this.productRepository.save(product)





        return this.findOne(id);
    }

    

    



}
