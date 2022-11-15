import {ObjectType, Field, Float} from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn, RelationId,
  UpdateDateColumn
} from "typeorm";
import {User} from "../user/user.entity";
import {Family} from "../family/family.entity";
import {Message} from "../message/message.entity";
import {Topic} from "../topic/topic.entity";

@ObjectType()
export class FileProperty {
  @Field(() => String)
  name: string;
  @Field(() => Float)
  size: number;
}

@ObjectType()
@Entity({ name: 'documents' })
export class Document {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: '255' })
  title: string;

  @Field(() => [FileProperty])
  @Column({ type: 'jsonb', default: '[]' })
  files: FileProperty[];

  @Field(() => String)
  @Column({ type: 'text', default: '' })
  description: string;

  @Field(() => Float)
  @Column({ type: 'float', default: 0 })
  price: number;

  @ManyToOne(() => Family, { nullable: true })
  @JoinColumn({ name: 'family_id' })
  family: Family;
  @RelationId((document: Document) => document.family)
  familyId: string;

  @Field(() => Boolean)
  @Column({ type: 'boolean', default: false })
  hidden: boolean;

  @Field(() => Boolean)
  @Column({ type: 'boolean', default: false, name: 'notify_user' })
  notifyUser: boolean; // notify when topic is opened on forum

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
  @RelationId((document: Document) => document.user)
  userId: number;

  @OneToMany(() => Topic, (topic) => topic.document, { onDelete: 'CASCADE' })
  topics: Message[];

  @Field()
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
