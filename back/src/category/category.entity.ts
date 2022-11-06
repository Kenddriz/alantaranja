import {ObjectType, Field} from '@nestjs/graphql';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Family} from "../family/family.entity";

@ObjectType()
@Entity({ name: 'categories' })
export class Category {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 60, unique: true })
  label: string;

  @OneToMany(() => Family, fam => fam.category, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  families: Family[];

  @Field(() => [Category])
  children: Category[];
}
