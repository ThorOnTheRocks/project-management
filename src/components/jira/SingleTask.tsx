import { IoReorderTwoOutline } from 'react-icons/io5';
import type { Task } from '../../interfaces/task.interface';
import { useTaskStore } from '../../store/task/task.store';

interface Props {
  task: Task;
}

function SingleTask({ task }: Props) {
  const setTaskDraggingId = useTaskStore((state) => state.setDraggingTaskId);
  const removeTaskDraggingId = useTaskStore((state) => state.removeDraggingTaskId);

  return (
    <div
      draggable
      onDragStart={() => setTaskDraggingId(task.id)}
      onDragEnd={removeTaskDraggingId}
      className="mt-5 flex items-center justify-between p-2"
    >
    <div className="flex items-center justify-center gap-2">
      <p className="text-base font-bold text-navy-700">
        {task.name}
      </p>
    </div>
    <span className=" h-6 w-6 text-navy-700 cursor-pointer">
      <IoReorderTwoOutline />
    </span>
  </div>
  )
}

export default SingleTask