import {Query, Resolver} from "@nestjs/graphql";
import {Family} from "../family.entity";
import {FamilyService} from "../family.service";

@Resolver(() => Family)
export class FamiliesResolver {
    constructor(private familyService: FamilyService) {}

    @Query(() => [Family])
    async families(): Promise<Family[]> {
        return this.familyService.all();
    }
}