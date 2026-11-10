export type TaskCategory = 'coding' | 'reading' | 'project' | 'study';

export type Task = {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  isCompleted: boolean;
  xpReward: number;
  completedAt?: string;
};
