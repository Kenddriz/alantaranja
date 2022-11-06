import {Resolver, Query} from '@nestjs/graphql';
import { CategoryService } from '../category.service';
import { Category } from '../category.entity';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private categoryService: CategoryService) {}

  @Query(() => [Category])
  categories() {
    return this.categoryService.all();
  }

}
