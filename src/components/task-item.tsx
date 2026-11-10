import { SymbolView } from "expo-symbols";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { DevFlowPalette } from "@/constants/theme";
import type { Task, TaskCategory } from "@/types/task";

type TaskItemProps = {
  task: Task;
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
};

const categoryIcons = {
  coding: {
    ios: "chevron.left.forwardslash.chevron.right",
    android: "code",
    web: "code",
  },
  reading: { ios: "book.closed", android: "menu_book", web: "menu_book" },
  project: { ios: "folder", android: "folder_open", web: "folder_open" },
  study: { ios: "graduationcap", android: "school", web: "school" },
} as const satisfies Record<
  TaskCategory,
  { ios: string; android: string; web: string }
>;

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <View style={[styles.card, task.isCompleted && styles.completedCard]}>
      <View style={styles.iconBox}>
        <SymbolView
          name={categoryIcons[task.category]}
          tintColor={
            task.isCompleted ? DevFlowPalette.green : DevFlowPalette.bronze
          }
          size={20}
          fallback={<Text style={styles.fallbackIcon}>✦</Text>}
        />
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, task.isCompleted && styles.completedTitle]}>
          {task.title}
        </Text>
        <Text style={styles.description}>{task.description}</Text>
        <Text style={styles.reward}>✦ {task.xpReward} XP reward</Text>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${task.isCompleted ? "Buka kembali" : "Selesaikan"} quest ${task.title}`}
        accessibilityState={{ checked: task.isCompleted }}
        onPress={() => onToggle(task.id)}
        style={({ pressed }) => [styles.action, pressed && styles.pressed]}
      >
        <Text
          style={[
            styles.actionText,
            task.isCompleted && styles.completedActionText,
          ]}
        >
          {task.isCompleted ? "DONE" : "CLAIM"}
        </Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Hapus quest ${task.title}`}
        onPress={() => onDelete(task.id)}
        style={({ pressed }) => [
          styles.deleteAction,
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.deleteActionText}>DEL</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    padding: 13,
    backgroundColor: DevFlowPalette.paper,
    borderWidth: 1,
    borderColor: DevFlowPalette.border,
    borderRadius: 5,
  },
  completedCard: {
    backgroundColor: DevFlowPalette.completedPaper,
  },
  iconBox: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: DevFlowPalette.wash,
    borderWidth: 1,
    borderColor: DevFlowPalette.border,
    borderRadius: 4,
  },
  fallbackIcon: {
    color: DevFlowPalette.bronze,
    fontSize: 20,
  },
  content: {
    flex: 1,
    gap: 3,
  },
  title: {
    color: DevFlowPalette.ink,
    fontSize: 14,
    fontWeight: "700",
  },
  completedTitle: {
    color: DevFlowPalette.secondary,
  },
  description: {
    color: DevFlowPalette.secondary,
    fontSize: 12,
    lineHeight: 17,
  },
  reward: {
    color: DevFlowPalette.bronze,
    fontSize: 11,
    fontWeight: "700",
    marginTop: 2,
  },
  action: {
    minWidth: 62,
    minHeight: 38,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: DevFlowPalette.bronze,
    borderRadius: 4,
  },
  actionText: {
    color: DevFlowPalette.ink,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.6,
  },
  completedActionText: {
    color: DevFlowPalette.green,
  },
  deleteAction: {
    minWidth: 42,
    minHeight: 38,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: DevFlowPalette.crimson,
    borderRadius: 4,
  },
  deleteActionText: {
    color: DevFlowPalette.crimson,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.4,
  },
  pressed: {
    opacity: 0.65,
  },
});
