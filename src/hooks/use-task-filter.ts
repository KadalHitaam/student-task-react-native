import { useMemo } from 'react';

import type { Task } from '@/types/task';

export function useTaskFilter(tasks: Task[]) {
  return useMemo(
    () => ({
      activeTasks: tasks.filter((task) => !task.isCompleted),
      completedTasks: tasks.filter((task) => task.isCompleted),
    }),
    [tasks]
  );
}
