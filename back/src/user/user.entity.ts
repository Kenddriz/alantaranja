import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'users' })
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: number;

  @Field()
  @Column({ type: 'varchar', name: 'first_name', length: 80, default: '' })
  firstName: string;

  @Field()
  @Column({ type: 'varchar', name: 'last_name', length: 80, default: '' })
  lastName: string;

  @Field()
  @Column({ type: 'varchar', length: 200, unique: true })
  email: string;

  @Field()
  @Column({ type: 'varchar', length: 20, default: '' })
  phone: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Field()
  @Column({ type: 'varchar', length: 255, default: '' })
  avatar: string;

  @Field(() => Int)
  @Column({ type: 'int', width: 1, default: 2 })
  role: number;

  @Field(() => Int)
  @Column({ type: 'int', width: 1, default: 0 })
  status: number; // 0 not verified, 1 verified

  @Field(() => Int)
  @Column({ type: 'int', width: 6, default: 0 })
  resetPasswordCode: number;

  @Field(() => Int)
  @Column({ type: 'int', width: 6, default: 0 })
  activationCode: number;

  @Field({ nullable: true })
  @Column({ type: 'timestamp', name: 'last_connexion', nullable: true })
  lastConnexion: Date;

  @Field()
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
