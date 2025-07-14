import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Task from "./Task";
import { task } from "./types/task";

export const Column = ({ tasks }: { tasks: task[] }) => {
  return (
    <div
      className={`bg-[#f2f2f3] rounded-sm p-3.5 w-4/5 max-w-lg flex flex-col gap-3.5`}
    >
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((task: task) => {
          return <Task key={task.id} id={task.id} title={task.title} />;
        })}
      </SortableContext>
    </div>
  );
};
