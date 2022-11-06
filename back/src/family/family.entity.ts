import {ObjectType, Field} from '@nestjs/graphql';
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId} from "typeorm";
import {Category} from "../category/category.entity";

@ObjectType()
@Entity({ name: 'families' })
export class Family {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Category)
  @ManyToOne(() => Category, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category: Category;
  @RelationId((family: Family) => family.category)
  categoryId: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'parent_id' })
  parent: Category;
  @Field(() => String, { nullable: true })
  @RelationId((family: Family) => family.parent)
  parentId?: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 255, default: '' })
  description: string;
}
