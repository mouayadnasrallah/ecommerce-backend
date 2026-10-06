import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from "typeorm";


export enum UserRole{
    ADMIN = 'ADMIN',
    CUSTOMER = 'CUSTOMER',
}

@Entity('users')
export class User {

@PrimaryGeneratedColumn('uuid')
id: string;

@Column({ name: "first_name", length: 100 })
firstName: string;

@Column({ name: "last_name", length: 100 })
lastName: string;

@Column({ name: "email", length: 255, unique: true })
email: string;

@Column({ name: "phone", length: 20, nullable: true })
phone: string;

@CreateDateColumn()
createdAt: Date;

@Column({ name: "password_hash", length: 255 })
passwordHash: string;

@Column({ type: 'enum', enum: UserRole, default: UserRole.CUSTOMER })
role: UserRole; 
}
