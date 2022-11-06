import { Injectable } from '@nestjs/common';
import {sendMail} from 'src/utils';
import { OnEvent } from '@nestjs/event-emitter';
import {User} from "../user.entity";
import {CONSTANTS, emailFooter} from "./user-constants";
import { UserRegisterScheduler } from "../schedules/user-register-scheduler";

@Injectable()
export class UserFulfillRegistrationListener {
  @OnEvent(CONSTANTS.userFulfillRegistration, { async: true })
  handleUserFulfillRegistrationEvent(event: User) {
      let html = '<h3>Bonjour ' + event.firstName + ' ' + event.lastName + ',</h3>';
      html += '<p>Il y à ' + UserRegisterScheduler.day + ' jours que vous vous êtes inscrit sur '
          + '<a href="' + process.env.SITE_URL +'">' + process.env.SITE_NAME + '.</a>' +
          ' Nous avons remarqué que vous n\'avez malheureusement pas activé votre compte. </p>';
      html += '<p>Sachez que nous vous invitons à suivre ce lien afin de finaliser cette étape très importante : </p>';

      html += '<p>Nous serons dans l’obligation dans un délais de ' + UserRegisterScheduler.day +' jours, à partir de cette date, ' +
          'de supprimer votre compte ainsi que les données relatives dans notre base de données. </p>';

      html += '<p>Nous vous invitons dès maintenant à finaliser votre processus d’inscription ';

      html += '<a href="' + process.env.SITE_URL + 'active-account?email=' + event.email + '&activation=' + event.activationCode + '">' + event.activationCode + '</a></p>'

      html += emailFooter();

      void sendMail({
          from: process.env.EMAIL_USERNAME,
          to: event.email,
          subject: 'Rappel de votre inscription sur ' + process.env.SITE_NAME,
          html,
      });
  }
}
