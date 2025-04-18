import { useShallow } from 'zustand/shallow';
import { JiraTasks } from '../../components';
import { useTaskStore } from '../../store/task/task.store';

export const JiraPage = () => {
  const pendingTasks = useTaskStore(useShallow((state) => state.getTaskByStatus("open")));
  const inprogressTasks = useTaskStore(useShallow((state) => state.getTaskByStatus("in-progress")));
  const doneTasks = useTaskStore(useShallow((state) => state.getTaskByStatus("done")));

  console.log({pendingTasks, inprogressTasks, doneTasks});

  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <JiraTasks tasks={pendingTasks} title='Pendientes' status='open' />
          
          <JiraTasks tasks={inprogressTasks} title='Avanzando' status='in-progress' />
          
          <JiraTasks tasks={doneTasks} title='Terminadas' status='done' />

      </div>

      



    </>
  );
};