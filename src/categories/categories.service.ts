import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto/create-category.dto';


@Injectable()

export class CategoriesService {
    constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    ){}
    async create(dto: CreateCategoryDto): Promise<Category> {
        const existingCategory = await this.categoryRepository.findOne({ where: { name: dto.name } });
        if (existingCategory) {
            throw new ConflictException(`Category with name "${dto.name}" already exists.`);
        }   
        const category = this.categoryRepository.create(dto);
        try{
        return this.categoryRepository.save(category);
        } catch (error) {
            if(typeof error === 'object' && error !== null && 'code' in error && error.code === '23505') {
                throw new ConflictException(`Category with name "${dto.name}" already exists.`);
            }
            throw error;
        }
    
    }

    async findAll(): Promise<Category[]> {
        return this.categoryRepository.find({
            order: {id: 'ASC'},
        });
    }
}
