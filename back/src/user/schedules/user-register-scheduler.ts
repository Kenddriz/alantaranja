import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from "cron";
import { UserService } from "../user.service";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { CONSTANTS } from "../listeners/user-constants";
const moment = require("moment");

@Injectable()
export class UserRegisterScheduler {
    public static day = 15;
    constructor(
        private schedulerRegistry: SchedulerRegistry,
        private userService: UserService,
        private emitter: EventEmitter2,
    ) {}
    addCronJob(id: number) {
        const name = 'user_' + id;
        const job = new CronJob(this.getDate(), () => {
            this.userService.findOneById(id).then(user => {
                if(user && [-1, 0].includes(user.status)) {
                    this.emitter.emit(CONSTANTS.userFulfillRegistration, user);
                    this.removeScheduler(name);//remove current job
                    this.jobRemoveUser(id); // add new job for removing after the delay
                } this.removeScheduler(name);
            });
        });
        this.schedulerRegistry.addCronJob(name, job);
        job.start();
    }

    private removeScheduler(name: string) {
        if(this.schedulerRegistry.doesExist("cron", name)) {
            const cron = this.schedulerRegistry.getCronJob(name);
            cron.stop();
            this.schedulerRegistry.deleteCronJob(name);
        }
    }

    private getDate() {
        const date = moment().add(UserRegisterScheduler.day, 'day');
        return `0 0 18 ${date.date()} ${date.month()} *`;
    }

    private jobRemoveUser(id: number) {
        const jobName = 'user' + id;
        const job = new CronJob(this.getDate(), () => {
            this.userService.findOneById(id).then(user => {
                if(user && [-1, 0].includes(user.status)) {
                   void this.userService.remove(user.id);
                }
            }).finally(() => this.removeScheduler(jobName));
        });
        this.schedulerRegistry.addCronJob(jobName, job);
        job.start();
    }
}