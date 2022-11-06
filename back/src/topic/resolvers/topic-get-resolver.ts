import {Args, Mutation, Query, Resolver, Subscription} from "@nestjs/graphql";
import {TopicService} from "../topic.service";
import {Topic} from "../topic.entity";
import {Inject, UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "../../auth/jwt-auth.guard";
import {Message} from "../../message/message.entity";
import {User} from "../../user/user.entity";
import {CurrentUser} from "../../auth/current-user-decorator";
import {StrategyType} from "../../auth/types/strategy.type";
import {MessageService} from "../../message/message.service";
import {PubSubEngine} from "graphql-subscriptions";
import {ReactionService} from "../../reaction/reaction.service";
import {MessageCreateInput, MessageReactionInput, MessageUpdateInput} from "../types/topic-input";
import {Reaction} from "../../reaction/reaction.entity";

const MESSAGE_EVENT = 'messageEvent';

@Resolver()
export class TopicGetResolver {
    constructor(
        private topicService: TopicService,
        private messageService: MessageService,
        private reactionService: ReactionService,
        @Inject('PUB_SUB') private pubSub: PubSubEngine,
    ) {}

    @Subscription(() => Message, {
        name: MESSAGE_EVENT,
        resolve: value => value
    })
    messageEvent() {
        return this.pubSub.asyncIterator(MESSAGE_EVENT);
    }

    async create(input: MessageCreateInput, userId: number, existing: Message = null): Promise<boolean> {
        const { topicId, messageId, ...res } = input;

        const message = existing || new Message();

        Object.assign(message, res);
        message.user = Object.assign(new User(), { id: userId });
        message.topic = Object.assign(new Topic(), { id: topicId });

        if(messageId) {
            message.message = Object.assign(new Message(), { id: messageId });
        }

        return new Promise((resolve) => {
            this.messageService
                .save(message)
                .then(message => {
                    if(message) {
                        this.pubSub.publish(MESSAGE_EVENT, message);
                        resolve(true);
                    } else resolve(false);
                }).catch(() => resolve(false));
        })
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean)
    async messageCreate(
        @Args('input')input: MessageCreateInput,
        @CurrentUser()strategy: StrategyType,
    ): Promise<boolean> {
        //Find a view was created for current user
        let message = await this.messageService.findView(strategy.id, input.topicId);
        if(message) {
            if(message.body)message = new Message();
            else message.createdAt = new Date();
        } else message = new Message();

        return this.create(input, strategy.id, message);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => Topic, { nullable: true })
    async topicGet(
        @Args('id')id: string,
        @CurrentUser()strategy: StrategyType,
    ): Promise<Topic> {
        const topic = await this.topicService.findOne(id);
        if(topic.userId !== strategy.id) {
            this.messageService.findView(strategy.id, id)
                .then(mes => {
                    if(!mes) {
                        //create view
                        this.create({
                            body: '',
                            topicId: id,
                        }, strategy.id, null);
                    }
                });
        }
        return topic;
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean)
    async reactMessage(
        @Args('input')input: MessageReactionInput,
        @CurrentUser()strategy: StrategyType,
    ): Promise<boolean> {
        const { messageId, ...res } = input;
        const message = await this.messageService.findOne(messageId);
        return new Promise<boolean>((resolve) => {
            this.reactionService
                .remove(strategy.id, messageId)
                .then(async () => {
                    const reaction = new Reaction();
                    reaction.user = Object.assign(new User(), { id: strategy.id });
                    reaction.message = message;
                    Object.assign(reaction, res);

                    this.reactionService.save(reaction)
                        .then(async () => {
                            this.pubSub.publish(MESSAGE_EVENT, message);
                            resolve(true);
                        }).catch(() => resolve(false));

                }).catch(() => resolve(false))
        })
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean)
    async messageUpdate(@Args('input')input: MessageUpdateInput): Promise<boolean> {
        const { id, ...res} = input;
        const message = await this.messageService.findOne(id);
        Object.assign(message, res);

        return new Promise((resolve) => {
            this.messageService
                .save(message)
                .then(message => {
                    this.pubSub.publish(MESSAGE_EVENT, message);
                    resolve(true);
                }).catch(() => resolve(false));
        })
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean)
    async messageRemove(@Args('id')id: string): Promise<boolean> {
        const { topicId } = await this.messageService.findOne(id);
        return new Promise<boolean>((resolve) => {
            this.messageService.remove(id).then(count => {
                if(count) {
                    const message = new Message();
                    message.id = '_' + id;
                    message.userId = null;
                    message.body = '';
                    message.topicId = topicId;
                    this.pubSub.publish(MESSAGE_EVENT, message);
                    resolve(true);
                } else resolve(false);
            }).catch(() => resolve(false));
        })
    }
}