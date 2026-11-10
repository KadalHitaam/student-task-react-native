import { useEffect, useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { mockTasks } from '@/data/mock-tasks';
import { useTaskFilter } from '@/hooks/use-task-filter';
import type { Task } from '@/types/task';
import { DevFlowPalette } from '@/constants/theme';
import { StatWidget } from '@/components/stat-widget';
import { TaskItem } from '@/components/task-item';

const XP_PER_LEVEL = 500;
type DashboardState = { tasks: Task[]; userXp: number };

function localDateKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

export function DashboardScreen() {
  const [dashboard, setDashboard] = useState<DashboardState>({ tasks: [], userXp: 0 });
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const { tasks, userXp } = dashboard;
  const { activeTasks, completedTasks } = useTaskFilter(tasks);

  useEffect(() => {
    let isMounted = true;
    Promise.resolve().then(() => {
      if (!isMounted) return;
      const initialTasks = mockTasks.map((task) => ({ ...task }));
      const initialXp = initialTasks.reduce(
        (total, task) => total + (task.isCompleted ? task.xpReward : 0),
        0
      );
      setDashboard({ tasks: initialTasks, userXp: initialXp });
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const xpEarnedToday = useMemo(() => {
    const today = localDateKey(new Date());
    return tasks.reduce((total, task) => {
      if (!task.isCompleted || !task.completedAt) return total;
      return localDateKey(new Date(task.completedAt)) === today ? total + task.xpReward : total;
    }, 0);
  }, [tasks]);

  const toggleTaskStatus = (taskId: string) => {
    setDashboard((current) => {
      const targetTask = current.tasks.find((task) => task.id === taskId);
      if (!targetTask) return current;

      const isCompleted = !targetTask.isCompleted;
      return {
        userXp: Math.max(0, current.userXp + (isCompleted ? targetTask.xpReward : -targetTask.xpReward)),
        tasks: current.tasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                isCompleted,
                completedAt: isCompleted ? new Date().toISOString() : undefined,
              }
            : task
        ),
      };
    });
  };

  const addTask = () => {
    const title = newTaskTitle.trim();
    if (!title) return;

    const task: Task = {
      id: `quest-${Date.now()}`,
      title,
      description: 'Quest baru menunggu untuk diselesaikan.',
      category: 'study',
      isCompleted: false,
      xpReward: 100,
    };
    setDashboard((current) => ({ ...current, tasks: [task, ...current.tasks] }));
    setNewTaskTitle('');
  };

  const completedCount = completedTasks.length;
  const level = Math.floor(userXp / XP_PER_LEVEL) + 1;
  const levelProgress = userXp % XP_PER_LEVEL;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.page}>
          <View style={styles.topline}>
            <Text style={styles.brand}>DEVFLOW</Text>
            <Text style={styles.realmLabel}>STUDENT TASK HUB</Text>
          </View>

          <View style={styles.titleBlock}>
            <Text style={styles.eyebrow}>YOUR ADVENTURE BEGINS</Text>
            <Text style={styles.title}>SANCTUARY</Text>
            <Text style={styles.subtitle}>Catat progres, tuntaskan quest, raih level berikutnya.</Text>
          </View>

          <View style={styles.levelCard}>
            <View style={styles.levelHeading}>
              <View>
                <Text style={styles.levelLabel}>ADVENTURER LEVEL</Text>
                <Text style={styles.levelValue}>Level {level}</Text>
              </View>
              <Text style={styles.levelXp}>{levelProgress} / {XP_PER_LEVEL} XP</Text>
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${(levelProgress / XP_PER_LEVEL) * 100}%` }]} />
            </View>
          </View>

          <View style={styles.statsRow}>
            <StatWidget
              label="Gold gained"
              value={completedCount * 25}
              detail={`+${completedCount * 25} this run`}
              icon="gold"
            />
            <StatWidget
              label="XP earned"
              value={userXp}
              detail={`+${xpEarnedToday} today`}
              icon="xp"
            />
            <StatWidget
              label="Quests done"
              value={`${completedCount}/${tasks.length}`}
              detail={`+${completedCount} completed`}
              icon="quests"
            />
          </View>

          <View style={styles.sectionHeading}>
            <View>
              <Text style={styles.sectionTitle}>RECENT ADVENTURES</Text>
              <Text style={styles.sectionSubtitle}>Quest kecil, progres besar.</Text>
            </View>
            <Text style={styles.activeCount}>{activeTasks.length} ACTIVE</Text>
          </View>

          <View style={styles.addTaskRow}>
            <TextInput
              accessibilityLabel="Judul quest baru"
              value={newTaskTitle}
              onChangeText={setNewTaskTitle}
              onSubmitEditing={addTask}
              placeholder="Tulis quest baru..."
              placeholderTextColor={DevFlowPalette.secondary}
              returnKeyType="done"
              style={styles.input}
            />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Tambah quest"
              onPress={addTask}
              style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}>
              <Text style={styles.addButtonText}>+ ADD</Text>
            </Pressable>
          </View>

          <View style={styles.taskList}>
            {activeTasks.length > 0 ? (
              activeTasks.map((task) => <TaskItem key={task.id} task={task} onToggle={toggleTaskStatus} />)
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyTitle}>Semua quest selesai.</Text>
                <Text style={styles.emptyText}>Tambahkan quest baru untuk melanjutkan petualangan.</Text>
              </View>
            )}
          </View>

          {completedTasks.length > 0 && (
            <View style={styles.completedSection}>
              <Text style={styles.sectionTitle}>CONQUERED QUESTS</Text>
              <View style={styles.taskList}>
                {completedTasks.map((task) => (
                  <TaskItem key={task.id} task={task} onToggle={toggleTaskStatus} />
                ))}
              </View>
            </View>
          )}

          <Text style={styles.footer}>PROGRESS IS BUILT ONE QUEST AT A TIME</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: DevFlowPalette.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingBottom: 28,
  },
  page: {
    width: '100%',
    maxWidth: 760,
    gap: 20,
  },
  topline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
  },
  brand: {
    color: DevFlowPalette.bronze,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2,
  },
  realmLabel: {
    color: DevFlowPalette.secondary,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
  },
  titleBlock: {
    gap: 5,
  },
  eyebrow: {
    color: DevFlowPalette.green,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.4,
  },
  title: {
    color: DevFlowPalette.ink,
    fontFamily: 'serif',
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: 1.1,
  },
  subtitle: {
    color: DevFlowPalette.secondary,
    fontSize: 13,
    lineHeight: 19,
  },
  levelCard: {
    gap: 12,
    padding: 15,
    backgroundColor: DevFlowPalette.paper,
    borderWidth: 1,
    borderColor: DevFlowPalette.border,
    borderRadius: 5,
  },
  levelHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 8,
  },
  levelLabel: {
    color: DevFlowPalette.secondary,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  levelValue: {
    color: DevFlowPalette.ink,
    fontFamily: 'serif',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 3,
  },
  levelXp: {
    color: DevFlowPalette.bronze,
    fontSize: 11,
    fontWeight: '700',
  },
  progressTrack: {
    height: 7,
    overflow: 'hidden',
    backgroundColor: DevFlowPalette.wash,
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: DevFlowPalette.bronze,
    borderRadius: 4,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  sectionHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 8,
    marginTop: 2,
  },
  sectionTitle: {
    color: DevFlowPalette.ink,
    fontFamily: 'serif',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  sectionSubtitle: {
    color: DevFlowPalette.secondary,
    fontSize: 11,
    marginTop: 3,
  },
  activeCount: {
    color: DevFlowPalette.green,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.7,
  },
  addTaskRow: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    flex: 1,
    minHeight: 44,
    paddingHorizontal: 12,
    color: DevFlowPalette.ink,
    backgroundColor: DevFlowPalette.paper,
    borderWidth: 1,
    borderColor: DevFlowPalette.border,
    borderRadius: 4,
    fontSize: 13,
  },
  addButton: {
    minWidth: 70,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: DevFlowPalette.paper,
    borderWidth: 1,
    borderColor: DevFlowPalette.bronze,
    borderRadius: 4,
  },
  addButtonText: {
    color: DevFlowPalette.ink,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  pressed: {
    opacity: 0.65,
  },
  taskList: {
    gap: 9,
  },
  emptyState: {
    padding: 18,
    alignItems: 'center',
    backgroundColor: DevFlowPalette.paper,
    borderWidth: 1,
    borderColor: DevFlowPalette.border,
    borderRadius: 5,
  },
  emptyTitle: {
    color: DevFlowPalette.ink,
    fontSize: 14,
    fontWeight: '700',
  },
  emptyText: {
    color: DevFlowPalette.secondary,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  completedSection: {
    gap: 9,
  },
  footer: {
    color: DevFlowPalette.secondary,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
    textAlign: 'center',
    paddingTop: 3,
  },
});
