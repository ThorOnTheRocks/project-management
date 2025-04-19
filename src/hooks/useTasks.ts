import { useState } from "react";
import Swal from "sweetalert2";
import { useTaskStore } from "../store/task/task.store";
import type { TaskStatus } from "../interfaces/task.interface";

interface Options {
  status: TaskStatus;
}


export const useTasks = ({ status }: Options) => {

  const [onDragOver, setOnDragOver] = useState(false);

  const isDragging = useTaskStore((state) => !!state.draggingTaskId);

  const addTask = useTaskStore((state) => state.addTask);

  const onTaskDrop = useTaskStore((state) => state.onTaskDrop);

  const handleAddTask = async () => {
    const { isConfirmed, value } = await Swal.fire({
      title: "Task Title",
      input: "text",
      inputLabel: "Task Name",
      inputPlaceholder: 'Insert name of the task',
      showCancelButton: true,
      inputValidator: (value) => {
        if(!value) {
          return "You have to insert a name for the task"
        }
      }
    })

    if(!isConfirmed) return;
    addTask(value, status)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(true);
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(false);
    console.log("handleDragLeave")
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log("handleDrop", status);
    setOnDragOver(false);
    onTaskDrop(status);
  }

  return {
    isDragging,
    onDragOver,
    handleAddTask,
    handleDragLeave,
    handleDragOver,
    handleDrop
  }
}