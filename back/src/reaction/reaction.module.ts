import {Global, Module} from '@nestjs/common';
import { ReactionService } from './reaction.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Reaction} from "./reaction.entity";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Reaction])],
  providers: [ReactionService],
  exports: [ReactionService],
})
export class ReactionModule {}
