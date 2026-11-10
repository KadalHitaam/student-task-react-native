import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DevFlowPalette } from '@/constants/theme';

type Milestone = {
  title: string;
  course: string;
  detail: string;
  status: 'complete' | 'current' | 'upcoming';
};

const milestones: Milestone[] = [
  {
    title: 'Map the Foundations',
    course: 'DATA STRUCTURES',
    detail: 'Review arrays, linked lists, stacks, and queues.',
    status: 'complete',
  },
  {
    title: 'Build the Data Vault',
    course: 'DATABASE SYSTEMS',
    detail: 'Design a relational schema and connect the app to its data.',
    status: 'current',
  },
  {
    title: 'Forge the Interface',
    course: 'MOBILE DEVELOPMENT',
    detail: 'Complete core screens and verify the experience on device.',
    status: 'upcoming',
  },
  {
    title: 'Present the Final Realm',
    course: 'CAPSTONE PROJECT',
    detail: 'Polish the project, prepare a demo, and submit the report.',
    status: 'upcoming',
  },
];

const statusLabels = {
  complete: 'COMPLETED',
  current: 'IN PROGRESS',
  upcoming: 'UPCOMING',
} as const;

export function ProjectRoadmapScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.page}>
          <Text style={styles.eyebrow}>LONG-TERM QUESTS</Text>
          <Text style={styles.title}>THE ROADMAP</Text>
          <Text style={styles.subtitle}>
            Satu jalur untuk mengubah tugas semester menjadi proyek yang selesai.
          </Text>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>CURRENT EXPEDITION</Text>
            <Text style={styles.summaryTitle}>Build a Student Task App</Text>
            <Text style={styles.summaryDetail}>4 milestones · 1 in progress</Text>
            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
            </View>
          </View>

          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>PROJECT MILESTONES</Text>
            <Text style={styles.sectionCount}>01 / 04</Text>
          </View>

          <View style={styles.timeline}>
            {milestones.map((milestone, index) => {
              const isComplete = milestone.status === 'complete';
              const isCurrent = milestone.status === 'current';
              return (
                <View key={milestone.title} style={styles.milestoneRow}>
                  <View style={styles.rail}>
                    <View
                      style={[
                        styles.marker,
                        isComplete && styles.completeMarker,
                        isCurrent && styles.currentMarker,
                      ]}>
                      <Text style={[styles.markerText, (isComplete || isCurrent) && styles.activeMarkerText]}>
                        {isComplete ? '✓' : String(index + 1).padStart(2, '0')}
                      </Text>
                    </View>
                    {index < milestones.length - 1 && (
                      <View style={[styles.connector, isComplete && styles.completeConnector]} />
                    )}
                  </View>
                  <View style={[styles.milestoneCard, isCurrent && styles.currentCard]}>
                    <View style={styles.cardTopline}>
                      <Text style={styles.course}>{milestone.course}</Text>
                      <Text
                        style={[
                          styles.status,
                          isComplete && styles.completeStatus,
                          isCurrent && styles.currentStatus,
                        ]}>
                        {statusLabels[milestone.status]}
                      </Text>
                    </View>
                    <Text style={styles.milestoneTitle}>{milestone.title}</Text>
                    <Text style={styles.milestoneDetail}>{milestone.detail}</Text>
                  </View>
                </View>
              );
            })}
          </View>
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
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 28,
  },
  page: {
    width: '100%',
    maxWidth: 760,
    gap: 18,
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
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: 1,
    marginTop: -13,
  },
  subtitle: {
    color: DevFlowPalette.secondary,
    fontSize: 13,
    lineHeight: 19,
    marginTop: -11,
  },
  summaryCard: {
    gap: 8,
    padding: 16,
    backgroundColor: DevFlowPalette.paper,
    borderWidth: 1,
    borderColor: DevFlowPalette.border,
    borderRadius: 5,
  },
  summaryLabel: {
    color: DevFlowPalette.bronze,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  summaryTitle: {
    color: DevFlowPalette.ink,
    fontFamily: 'serif',
    fontSize: 18,
    fontWeight: '700',
  },
  summaryDetail: {
    color: DevFlowPalette.secondary,
    fontSize: 11,
  },
  progressTrack: {
    height: 7,
    overflow: 'hidden',
    backgroundColor: DevFlowPalette.wash,
    borderRadius: 4,
    marginTop: 4,
  },
  progressFill: {
    width: '25%',
    height: '100%',
    backgroundColor: DevFlowPalette.green,
    borderRadius: 4,
  },
  sectionHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  sectionTitle: {
    color: DevFlowPalette.ink,
    fontFamily: 'serif',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  sectionCount: {
    color: DevFlowPalette.secondary,
    fontSize: 10,
    fontWeight: '700',
  },
  timeline: {
    gap: 0,
  },
  milestoneRow: {
    flexDirection: 'row',
    gap: 12,
  },
  rail: {
    width: 30,
    alignItems: 'center',
  },
  marker: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: DevFlowPalette.background,
    borderWidth: 1,
    borderColor: DevFlowPalette.border,
    borderRadius: 14,
  },
  completeMarker: {
    backgroundColor: DevFlowPalette.green,
    borderColor: DevFlowPalette.green,
  },
  currentMarker: {
    backgroundColor: DevFlowPalette.bronze,
    borderColor: DevFlowPalette.bronze,
  },
  markerText: {
    color: DevFlowPalette.secondary,
    fontSize: 9,
    fontWeight: '800',
  },
  activeMarkerText: {
    color: DevFlowPalette.paper,
  },
  connector: {
    width: 1,
    flex: 1,
    minHeight: 12,
    backgroundColor: DevFlowPalette.border,
  },
  completeConnector: {
    backgroundColor: DevFlowPalette.green,
  },
  milestoneCard: {
    flex: 1,
    gap: 7,
    padding: 13,
    marginBottom: 10,
    backgroundColor: DevFlowPalette.paper,
    borderWidth: 1,
    borderColor: DevFlowPalette.border,
    borderRadius: 5,
  },
  currentCard: {
    borderColor: DevFlowPalette.bronze,
  },
  cardTopline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  course: {
    flexShrink: 1,
    color: DevFlowPalette.secondary,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.7,
  },
  status: {
    color: DevFlowPalette.secondary,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  completeStatus: {
    color: DevFlowPalette.green,
  },
  currentStatus: {
    color: DevFlowPalette.bronze,
  },
  milestoneTitle: {
    color: DevFlowPalette.ink,
    fontSize: 14,
    fontWeight: '700',
  },
  milestoneDetail: {
    color: DevFlowPalette.secondary,
    fontSize: 12,
    lineHeight: 17,
  },
});
