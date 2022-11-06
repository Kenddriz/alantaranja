import {Global, Module} from '@nestjs/common';
import { FamilyService } from './family.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Family} from "./family.entity";
import {FamiliesResolver} from "./resolvers/families-resolver";
import {FamilyFieldResolver} from "./resolvers/family-field-resolver";
import {FamilyRemoveResolver} from "./resolvers/family-remove-resolver";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Family])],
  providers: [
    FamiliesResolver,
    FamilyFieldResolver,
    FamilyRemoveResolver,
    FamilyService
  ],
  exports: [FamilyService],
})
export class FamilyModule {}
