import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateResolver } from './resolvers/user-create-resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UpdatePasswordResolver } from './resolvers/update-password-resolver';
import { UpdateUserResolver } from './resolvers/update-user-resolver';
import { UserCreatedListener } from './listeners/user-created.listener';
import {SendCodeResolver} from "./resolvers/send-code-resolver";
import {ResetPasswordResolver} from "./resolvers/reset-password-resolver";
import {UserEmailVerifiedListener} from "./listeners/user-email-verified.listener";
import {UserActivationResolver} from "./resolvers/user-activation-resolver";
import {ResendUserCreatedEmailResolver} from "./resolvers/resend-user-created-email-resolver";
import {UserRegisterScheduler} from "./schedules/user-register-scheduler";
import {UserFulfillRegistrationListener} from "./listeners/user-fulfill-registration-listener";
import {hashSync} from "bcrypt";
import {UsersPaginateResolver} from "./resolvers/users-paginate-resolver";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserCreateResolver,
    UpdatePasswordResolver,
    UpdateUserResolver,
    UserActivationResolver,
    ResendUserCreatedEmailResolver,
    UserCreatedListener,
    UserEmailVerifiedListener,
    UserFulfillRegistrationListener,
    SendCodeResolver,
    ResetPasswordResolver,
    UserService,
    UserRegisterScheduler,
    UsersPaginateResolver,
  ],
  exports: [UserService, UserRegisterScheduler],
})
export class UserModule {
  constructor(private userService: UserService) {
    this.userService.getAdmin().then(user => {
      if(!user) {
        user = new User();
        user.lastName = 'super';
        user.firstName = 'admin';
        user.password = hashSync('admin2022', 10);
        user.status = 1;
        user.role = 0;
        user.email = process.env.EMAIL_USERNAME;
        this.userService.save(user);
      }
    })
  }
}
