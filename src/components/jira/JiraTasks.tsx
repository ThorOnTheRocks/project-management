import { IoCheckmarkCircleOutline, IoAddOutline } from 'react-icons/io5';
import type { Task, TaskStatus } from '../../interfaces/task.interface';
import SingleTask from './SingleTask';
import classNames from 'classnames';
import { useTasks } from '../../hooks/useTasks';

interface Props {
  tasks: Task[];
  title: string;
  status: TaskStatus;
}


export const JiraTasks = ({ tasks, title, status }: Props) => {

  const {
    isDragging,
    onDragOver,
    handleAddTask,
    handleDragLeave,
    handleDragOver,
    handleDrop
  } = useTasks({ status });


  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={
        classNames("!text-black border-4 relative border- flex flex-col rounded-[20px]  bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px]", {
          "border-blue-500 border-dotted": isDragging,
          "border-green-500 border-dotted": isDragging && onDragOver
        })
      }
    >


      {/* Task Header */ }
      <div className="relative flex flex-row justify-between">

        <div className="flex items-center justify-center">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">
            <span className="flex justify-center items-center h-6 w-6 text-brand-500">
              <IoCheckmarkCircleOutline style={ { fontSize: '50px' } } />
            </span>
          </div>

          <h4 className="ml-4 text-xl font-bold text-navy-700">{ title }</h4>
        </div>

        <button onClick={handleAddTask}>
          <IoAddOutline />
        </button>

      </div>

      {/* Task Items */ }
      <div className="h-full w-full">
        {tasks.map(task => (
          <SingleTask key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};