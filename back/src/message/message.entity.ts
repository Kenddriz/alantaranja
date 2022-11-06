import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId
} from "typeorm";
import {User} from "../user/user.entity";
import {Topic} from "../topic/topic.entity";
import {MessageReaction} from "../topic/types/topic-input";

@ObjectType()
@Entity({ name: 'messages' })
export class Message {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column({ type: 'text', default: '' })
  body: string;

  @ManyToOne(() => Topic)
  @JoinColumn({ name: 'topic_id' })
  topic: Topic;
  @Field(() => String)
  @RelationId((message: Message) => message.topic)
  topicId: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
  @RelationId((message: Message) => message.user)
  userId: number;

  @ManyToOne(() => Message, (m) => m.message, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'message_id' })
  message: Message;
  @Field({ nullable: true })
  @RelationId((message: Message) => message.message)
  messageId?: string;

  //resolver fields
  @Field(() => [Message])
  responses: Message[];

  @Field(() => [MessageReaction])
  reactions: MessageReaction[];

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
