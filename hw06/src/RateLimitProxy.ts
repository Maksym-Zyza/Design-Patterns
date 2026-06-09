import { IMessageService } from "./IMessageService";

export function createRateLimitProxy(
  service: IMessageService,
  intervalMs: number
): IMessageService {
  let lastSentTime = 0;

  return new Proxy(service, {
    get(target, prop) {
      if (prop === 'send') {
        return function (message: string) {
          const now = Date.now();
          if (now - lastSentTime >= intervalMs) {
            lastSentTime = now;
            target.send(message);
          } else {
            console.log("[RateLimit] skipped");
          }
        };
      }
      return Reflect.get(target, prop);
    },
  });
}
