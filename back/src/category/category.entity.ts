import {ObjectType, Field, Int} from '@nestjs/graphql';
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId} from "typeorm";
import {Family} from "../family/family.entity";
import {User} from "../user/user.entity";

@ObjectType()
@Entity({ name: 'categories' })
export class Category {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 60, unique: true })
  label: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
  @Field(()=> Int, { nullable: true })
  @RelationId((category: Category) => category.user)
  userId: number;

  @OneToMany(() => Family, fam => fam.category, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  families: Family[];

  @Field(() => [Category])
  children: Category[];
}
