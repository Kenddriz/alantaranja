import { Injectable } from '@nestjs/common';
import {sendMail} from 'src/utils';
import { OnEvent } from '@nestjs/event-emitter';
import {User} from "../user.entity";
import {CONSTANTS, emailFooter} from "./user-constants";
import { UserRegisterScheduler } from "../schedules/user-register-scheduler";

@Injectable()
export class UserCreatedListener {
    constructor(private scheduler: UserRegisterScheduler) {}
  @OnEvent(CONSTANTS.userCreatedEvent, { async: true })
  handleUserCreatedEvent(event: User) {
    void UserCreatedListener.send(event);

    //watch if user process inscription
    this.scheduler.addCronJob(event.id);
  }
   static async send(event: User): Promise<boolean> {
     let html = '<h3>Bonjour ' + event.firstName + ' ' + event.lastName + ',</h3>';
     html += '<p>Nous avons le plaisir de vous confirmer que vous êtes bien inscrit sur <b>';
     html += '<a href="' + process.env.SITE_URL +'">' + process.env.SITE_NAME + '</a>';
     html += '</b>. Nous vous prions de cliquer sur le lien ci-dessous afin d\'activer votre compte : </p>';
     html += '<a href="' + process.env.SITE_URL + 'auth/active-account?email=' + event.email + '&activation=' + event.activationCode + '">' + event.activationCode + '</a>';
     html += emailFooter();

     return await sendMail({
       from: process.env.EMAIL_USERNAME,
       to: event.email,
       subject: 'Inscription sur ' + process.env.SITE_NAME,
       html,
     });
   }
}
