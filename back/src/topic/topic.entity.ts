import {ObjectType, Field, Int} from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId
} from "typeorm";
import {User} from "../user/user.entity";
import {Document} from "../document/document.entity";
import {Message} from "../message/message.entity";

@ObjectType()
@Entity({ name: 'topics' })
export class Topic {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column({ type: 'text' })
  title: string;

  @Field(() => String)
  @Column({ type: 'text' })
  body: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
  @RelationId((topic: Topic) => topic.user)
  userId: number;

  @ManyToOne(() => Document, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'document_id' })
  document: Document;
  @RelationId((topic: Topic) => topic.document)
  documentId: string;

  @OneToMany(() => Message, (m) => m.topic)
  messages: Message[];

  @Field()
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Field(() => [Int])
  statistics: number[];
}
