import { AbstractHandler } from "../AbstractHandler";
import { SystemErrorRecord } from "../../models/DataRecord";

export class MessageTrimmer extends AbstractHandler {
  protected process(record: SystemErrorRecord): SystemErrorRecord {
    if (!record.message) {
      throw new Error("Missing message");
    }
    let message = record.message;
    if (message.length > 255) {
      message = message.substring(0, 255);
    }
    return { ...record, message };
  }
}
