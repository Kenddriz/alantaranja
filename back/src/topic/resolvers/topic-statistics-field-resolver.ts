import {Int, ResolveField, Resolver, Root} from "@nestjs/graphql";
import {Topic} from "../topic.entity";
import {MessageService} from "../../message/message.service";

@Resolver(() => Topic)
export class TopicStatisticsFieldResolver {
    constructor(private messageService: MessageService) {}

    @ResolveField(() => [Int])
    async statistics(@Root()topic: Topic): Promise<number[]> {
        return new Promise<number[]>((resolve) => {
            this.messageService.findByByTopic(topic.id, true)
                .then(messages => {
                    resolve(messages.reduce((cum, cur) => {
                        cum[!cur.body ? 0 : 1] += 1;
                        return cum;
                    }, [0, 0]));
                }).catch(() => resolve([0, 0]));
        })
    }
}