import {Args, Field, InputType, Mutation, Resolver} from "@nestjs/graphql";
import {Family} from "../family.entity";
import {FamilyService} from "../family.service";
import {Category} from "../../category/category.entity";
import {CategoryService} from "../../category/category.service";
import {CategoryCreateInput} from "../../category/resolvers/category-create-resolver";

@InputType()
export class FamilyUpdateInput extends CategoryCreateInput{
    @Field(() => String)
    id: string;
}
@Resolver(() => Family)
export class FamilyUpdateResolver {
    constructor(
        private categoryService: CategoryService,
        private familyService: FamilyService,
    ) {}

    @Mutation(() => Family)
    async familyUpdate(@Args('input')input: FamilyUpdateInput): Promise<Family> {
        const { id, parentId, description, ...res } = input;
        const family = await this.familyService.findOneById(id);
        family.description = description;
        family.parent = Object.assign(new Category(), { id: parentId });
        family.category = await this.categoryService.findById(family.categoryId);
        Object.assign(family.category, res);

        return new Promise((resolve, reject) => {
            this.familyService
                .check(parentId, family.categoryId, false)
                .then(fam => {
                    if(fam)reject('categoryExists');
                    else {
                        this.categoryService
                            .save(family.category)
                            .then(async () => {
                                resolve(await this.familyService.save(family));
                            }).catch(() => reject('categoryExists'))
                    }
                }).catch(() => reject('categoryExists'));
        });
    }
}