import type { Task } from '@/types/task';

export const mockTasks: Task[] = [
  {
    id: 'quest-algorithms',
    title: 'Defeat the Algorithm',
    description: 'Selesaikan latihan struktur data dan analisis kompleksitas.',
    category: 'coding',
    isCompleted: false,
    xpReward: 150,
  },
  {
    id: 'quest-database',
    title: 'Restore the Data Vault',
    description: 'Rancang skema basis data dan tulis query SQL untuk proyek.',
    category: 'project',
    isCompleted: false,
    xpReward: 120,
  },
  {
    id: 'quest-networking',
    title: 'Decode the Network Sigils',
    description: 'Baca materi protokol jaringan dan rangkum konsep penting.',
    category: 'reading',
    isCompleted: true,
    xpReward: 80,
    completedAt: new Date().toISOString(),
  },
  {
    id: 'quest-mobile-ui',
    title: 'Forge the Mobile Interface',
    description: 'Bangun dan uji satu layar untuk tugas aplikasi mobile.',
    category: 'study',
    isCompleted: false,
    xpReward: 180,
  },
];
