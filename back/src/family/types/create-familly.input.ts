import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFamillyInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
