import { ObjectType, Field } from '@nestjs/graphql';
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId} from "typeorm";
import {Message} from "../message/message.entity";
import {User} from "../user/user.entity";

@ObjectType()
@Entity({ name: 'reactions' })
export class Reaction {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 7, enum: ['like', 'dislike']})
  label: string;

  @ManyToOne(() => Message, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'message_id' })
  message: Message;
  @RelationId((reaction: Reaction) => reaction.message)
  messageId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
  @RelationId((reaction: Reaction) => reaction.user)
  userId: string;

}
