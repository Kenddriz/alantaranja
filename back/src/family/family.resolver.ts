import { Resolver } from '@nestjs/graphql';
import { FamilyService } from './family.service';
import { Family } from './family.entity';

@Resolver(() => Family)
export class FamilyResolver {
  constructor(private readonly familyService: FamilyService) {}
}
