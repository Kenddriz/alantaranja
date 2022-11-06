import { CreateFamillyInput } from './create-familly.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFamillyInput extends PartialType(CreateFamillyInput) {
  @Field(() => Int)
  id: number;
}
