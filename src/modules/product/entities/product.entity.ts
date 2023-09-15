import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({
    default: ''
  })
  des: string;

  @Column({ 
    default: true 
  })
  isActive: boolean;
}