import {Resolver, Mutation, Args, InputType, Field} from '@nestjs/graphql';
import { CategoryService } from '../category.service';
import { Category } from '../category.entity';
import {Family} from "../../family/family.entity";
import {FamilyService} from "../../family/family.service";
import {UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "../../auth/jwt-auth.guard";
import {CurrentUser} from "../../auth/current-user-decorator";
import {StrategyType} from "../../auth/types/strategy.type";
import {User} from "../../user/user.entity";

@InputType()
export class CategoryCreateInput {
  @Field({ nullable: true })
  parentId?: string;

  @Field()
  label: string;

  @Field()
  description: string;
}
@Resolver(() => Category)
export class CategoryCreateResolver {
  constructor(
      private categoryService: CategoryService,
      private familyService: FamilyService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Family)
  async categoryCreate(
      @Args('input') input: CategoryCreateInput,
      @CurrentUser()strategy: StrategyType,
  ): Promise<Family> {
    const { parentId, description, ...res } = input;

    let category = await this.categoryService.findByLabel(res.label);

    if(!category) {
        category = Object.assign(new Category(), res);
        category.user = Object.assign(new User(), { id: strategy.id });
    }

    else if(category.id === parentId) throw new Error('categoryEquals');

    return new Promise((resolve, reject) => {
      this.categoryService
          .save(category)
          .then(async category => {
            let family = await this.familyService.check(category.id, parentId);
            if(!family) {
              family = new Family();
              family.category = category;
              family.parent = Object.assign(new Category(), {
                id: parentId,
                description
              });
              resolve(await this.familyService.save(family));
            }
            else reject('categoryExist');
          }).catch((e) => {
              reject('categoryFailedSave');
          });
    })

  }

}
