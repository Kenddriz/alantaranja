import { Injectable } from '@nestjs/common';
import {sendMail} from 'src/utils';
import { OnEvent } from '@nestjs/event-emitter';
import {User} from "../user.entity";
import {CONSTANTS, emailFooter} from "./user-constants";

@Injectable()
export class UserEmailVerifiedListener {
  @OnEvent(CONSTANTS.userEmailVerifiedEvent, { async: true })
  handleUserEmailVerifiedEvent(event: User) {

    let html = '<h3>Bonjour ' + event.firstName + ' ' + event.lastName + ',</h3>';
    html += '<p>Bravo ! Votre compte est validé.</p>';
    html += '<p><a href="'+ process.env.SITE_URL + 'auth/login">Cliquer ici pour vous connecter</a></p>';
    html += emailFooter();

    void sendMail({
      from: process.env.EMAIL_USERNAME,
      to: event.email,
      subject: 'Validation de votre compte sur ' + process.env.SITE_NAME,
      html,
    });
  }
}
