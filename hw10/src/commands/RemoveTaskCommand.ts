import { AbstractCommand } from "./AbstractCommand";
import { TaskList } from "../models/TaskList";
import { Task } from "../models/Task";

export class RemoveTaskCommand extends AbstractCommand {
  private removedTask: Task | undefined;

  constructor(private taskList: TaskList, private taskId: string) {
    super();
  }

  execute(): void {
    const task = this.taskList.removeTask(this.taskId);
    if (task) {
      this.removedTask = task;
    }
  }

  undo(): void {
    if (this.removedTask) {
      this.taskList.addTask(this.removedTask);
    }
  }
}
