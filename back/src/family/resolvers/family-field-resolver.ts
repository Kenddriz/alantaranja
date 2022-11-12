import {ResolveField, Resolver, Root} from "@nestjs/graphql";
import {Family} from "../family.entity";
import {Category} from "../../category/category.entity";
import {CategoryService} from "../../category/category.service";

@Resolver(() => Family)
export class FamilyFieldResolver {
    constructor(private categoryService: CategoryService) {}

    @ResolveField(() => Category)
    async category(@Root()family: Family): Promise<Category> {
        return this.categoryService.findById(family.categoryId);
    }
}