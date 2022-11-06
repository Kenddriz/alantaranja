import {Global, Module} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryCreateResolver } from './resolvers/category-create-resolver';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Category} from "./category.entity";
import {CategoriesResolver} from "./resolvers/categories-resolver";
import {FamilyUpdateResolver} from "../family/resolvers/family-update-resolver";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [
    CategoryCreateResolver,
    CategoriesResolver,
    FamilyUpdateResolver,
    CategoryService
  ],
  exports: [CategoryService],
})
export class CategoryModule {}
