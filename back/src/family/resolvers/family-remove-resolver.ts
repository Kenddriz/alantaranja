import {Args, Mutation, Resolver} from "@nestjs/graphql";
import {Family} from "../family.entity";
import {FamilyService} from "../family.service";
import {CategoryService} from "../../category/category.service";

@Resolver(() => Family)
export class FamilyRemoveResolver {
    constructor(
        private categoryService: CategoryService,
        private familyService: FamilyService,
    ) {}
    @Mutation(() => String)
    async familyRemove(@Args('id')id: string): Promise<string> {
        const family = await this.familyService.findOneById(id);
        return new Promise((resolve) => {
            if(!family.parentId) {
                this.categoryService
                    .remove(family.categoryId)
                    .then(count => resolve(count ? id : ''))
                    .catch(() => resolve(''))
            } else {
                this.familyService
                    .remove(family)
                    .then(fam => resolve(fam ? id : ''))
                    .catch(() => resolve(''))
            }
        })
    }
}