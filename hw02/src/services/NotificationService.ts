import { INotificationChannel, INotificationService } from "../core/interfaces";
import { User } from "../models/User";

export class NotificationService implements INotificationService {
  private channels: INotificationChannel[] = [];

  addChannel(channel: INotificationChannel): void {
    this.channels.push(channel);
  }

  sendNotification(user: User, message: string): void {
    for (const channel of this.channels) {
      channel.send(user, message);
    }
  }
}
