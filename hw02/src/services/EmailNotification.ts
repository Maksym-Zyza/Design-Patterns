import { INotificationChannel, ILogger } from "../core/interfaces";
import { User } from "../models/User";

export class EmailNotification implements INotificationChannel {
  constructor(private logger: ILogger) {}

  send(user: User, message: string): void {
    this.logger.log(`Sending EMAIL to ${user.email}`);
    console.log(`Email sent to ${user.email}: ${message}`);
  }
}
