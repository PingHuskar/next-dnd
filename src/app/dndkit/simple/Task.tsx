import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { task } from "./types/task";

export default function Task({id, title}: task) {
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }
    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className={`bg-white rounded-sm w-full p-5 flex items-center justify-start gap-5 touch-none`}
      >
        <input type="checkbox" className={`h-5 w-5`} name="" id="" />
        {title}
      </div>
    );
}