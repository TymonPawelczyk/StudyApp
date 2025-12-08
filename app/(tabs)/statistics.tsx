import Ionicons from "@expo/vector-icons/Ionicons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import {
  mockAchievements,
  mockStatistics,
  mockWeeklyActivity,
} from "../../data/mockData";
import { useProfile } from "../../hooks/useProfile";

export default function StatisticsScreen() {
  const { user } = useAuth();
  const { profile } = useProfile();

  const displayName =
    (profile?.full_name as string | undefined) ||
    (profile?.username as string | undefined) ||
    user?.email?.split("@")[0] ||
    "Student";

  // Use mock data - replace with real data from Supabase later
  const stats = mockStatistics;
  const weeklyActivity = mockWeeklyActivity;
  const achievements = mockAchievements;

  const completionRate = Math.round(
    (stats.completedLessons / stats.totalLessons) * 100
  );
  const studyHours = Math.floor(stats.totalStudyTime / 60);
  const studyMinutes = stats.totalStudyTime % 60;
  const maxMinutes = Math.max(...weeklyActivity.map((d) => d.minutes));

  return (
    <SafeAreaProvider>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Your Progress</Text>
            <Text style={styles.userName}>{displayName}</Text>
          </View>
          <View style={styles.streakBadge}>
            <Ionicons name="flame" size={20} color="#ff6b35" />
            <Text style={styles.streakText}>
              {stats.currentStreak} day streak
            </Text>
          </View>
        </View>

        {/* Main Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Ionicons name="checkmark-circle" size={28} color="#c0f000" />
            </View>
            <Text style={styles.statValue}>
              {stats.completedLessons}/{stats.totalLessons}
            </Text>
            <Text style={styles.statLabel}>Lessons Completed</Text>
            <View style={styles.progressBar}>
              <View
                style={[styles.progressFill, { width: `${completionRate}%` }]}
              />
            </View>
            <Text style={styles.progressText}>{completionRate}%</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Ionicons name="book" size={28} color="#c0f000" />
            </View>
            <Text style={styles.statValue}>{stats.wordsLearned}</Text>
            <Text style={styles.statLabel}>Words Learned</Text>
          </View>
        </View>

        {/* Time Stats */}
        <View style={styles.timeCard}>
          <View style={styles.timeHeader}>
            <Ionicons name="time-outline" size={24} color="#c0f000" />
            <Text style={styles.timeTitle}>Total Study Time</Text>
          </View>
          <Text style={styles.timeValue}>
            {studyHours}h {studyMinutes}m
          </Text>
          <View style={styles.timeStats}>
            <View style={styles.timeStat}>
              <Text style={styles.timeStatValue}>{stats.currentStreak}</Text>
              <Text style={styles.timeStatLabel}>Current Streak</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.timeStat}>
              <Text style={styles.timeStatValue}>{stats.longestStreak}</Text>
              <Text style={styles.timeStatLabel}>Longest Streak</Text>
            </View>
          </View>
        </View>

        {/* Weekly Activity Chart */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Weekly Activity</Text>
          <Text style={styles.chartSubtitle}>Minutes per day</Text>

          <View style={styles.chart}>
            {weeklyActivity.map((item, index) => {
              const height = (item.minutes / maxMinutes) * 100;
              return (
                <View key={index} style={styles.chartBarContainer}>
                  <View style={styles.chartBarWrapper}>
                    <View style={[styles.chartBar, { height: `${height}%` }]} />
                  </View>
                  <Text style={styles.chartLabel}>{item.day}</Text>
                  <Text style={styles.chartValue}>{item.minutes}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Weekly Goal */}
        <View style={styles.goalCard}>
          <View style={styles.goalHeader}>
            <View>
              <Text style={styles.goalTitle}>Weekly Goal</Text>
              <Text style={styles.goalSubtitle}>
                {stats.weeklyProgress} of {stats.weeklyGoal} days completed
              </Text>
            </View>
            <View style={styles.goalBadge}>
              <Text style={styles.goalBadgeText}>
                {Math.round((stats.weeklyProgress / stats.weeklyGoal) * 100)}%
              </Text>
            </View>
          </View>
          <View style={styles.goalProgress}>
            <View
              style={[
                styles.goalProgressFill,
                {
                  width: `${(stats.weeklyProgress / stats.weeklyGoal) * 100}%`,
                },
              ]}
            />
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.achievementsCard}>
          <Text style={styles.achievementsTitle}>Recent Achievements</Text>
          <View style={styles.achievementsList}>
            {achievements.map((achievement) => (
              <View key={achievement.id} style={styles.achievement}>
                <View
                  style={[
                    styles.achievementIcon,
                    { backgroundColor: achievement.color },
                  ]}
                >
                  <Ionicons
                    name={achievement.icon as any}
                    size={20}
                    color="#0f172a"
                  />
                </View>
                <View style={styles.achievementContent}>
                  <Text style={styles.achievementName}>{achievement.name}</Text>
                  <Text style={styles.achievementDesc}>
                    {achievement.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 100,
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 32,
  },
  greeting: {
    fontSize: 16,
    color: "#94a3b8",
    fontWeight: "500",
  },
  userName: {
    fontSize: 32,
    fontWeight: "800",
    color: "#f1f5f9",
    letterSpacing: -0.5,
    marginTop: 4,
  },
  streakBadge: {
    backgroundColor: "#1e293b",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#334155",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  streakText: {
    color: "#f1f5f9",
    fontSize: 12,
    fontWeight: "700",
  },

  // Stats Grid
  statsGrid: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#1e293b",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#334155",
    alignItems: "center",
  },
  statIconContainer: {
    width: 56,
    height: 56,
    backgroundColor: "#0f172a",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#334155",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "800",
    color: "#f1f5f9",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#94a3b8",
    fontWeight: "500",
    textAlign: "center",
  },
  progressBar: {
    width: "100%",
    height: 6,
    backgroundColor: "#0f172a",
    borderRadius: 3,
    marginTop: 12,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#c0f000",
    borderRadius: 3,
  },
  progressText: {
    fontSize: 11,
    color: "#c0f000",
    fontWeight: "700",
    marginTop: 6,
  },

  // Time Card
  timeCard: {
    backgroundColor: "#1e293b",
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#334155",
  },
  timeHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  timeTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#f1f5f9",
  },
  timeValue: {
    fontSize: 36,
    fontWeight: "800",
    color: "#c0f000",
    marginBottom: 16,
  },
  timeStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  timeStat: {
    flex: 1,
    alignItems: "center",
  },
  timeStatValue: {
    fontSize: 28,
    fontWeight: "800",
    color: "#f1f5f9",
    marginBottom: 4,
  },
  timeStatLabel: {
    fontSize: 12,
    color: "#94a3b8",
    fontWeight: "500",
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: "#334155",
  },

  // Chart Card
  chartCard: {
    backgroundColor: "#1e293b",
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#334155",
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#f1f5f9",
    marginBottom: 4,
  },
  chartSubtitle: {
    fontSize: 12,
    color: "#94a3b8",
    marginBottom: 20,
  },
  chart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 140,
  },
  chartBarContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  chartBarWrapper: {
    width: "100%",
    height: 100,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 8,
  },
  chartBar: {
    width: "60%",
    backgroundColor: "#c0f000",
    borderRadius: 4,
    minHeight: 4,
  },
  chartLabel: {
    fontSize: 10,
    color: "#94a3b8",
    fontWeight: "600",
    marginBottom: 2,
  },
  chartValue: {
    fontSize: 9,
    color: "#64748b",
    fontWeight: "500",
  },

  // Goal Card
  goalCard: {
    backgroundColor: "#1e293b",
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#334155",
  },
  goalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#f1f5f9",
    marginBottom: 4,
  },
  goalSubtitle: {
    fontSize: 12,
    color: "#94a3b8",
  },
  goalBadge: {
    backgroundColor: "#c0f000",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  goalBadgeText: {
    color: "#0f172a",
    fontSize: 14,
    fontWeight: "900",
  },
  goalProgress: {
    height: 10,
    backgroundColor: "#0f172a",
    borderRadius: 5,
    overflow: "hidden",
  },
  goalProgressFill: {
    height: "100%",
    backgroundColor: "#c0f000",
    borderRadius: 5,
  },

  // Achievements
  achievementsCard: {
    backgroundColor: "#1e293b",
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#334155",
  },
  achievementsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#f1f5f9",
    marginBottom: 16,
  },
  achievementsList: {
    gap: 16,
  },
  achievement: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  achievementIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  achievementContent: {
    flex: 1,
  },
  achievementName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#f1f5f9",
    marginBottom: 2,
  },
  achievementDesc: {
    fontSize: 12,
    color: "#94a3b8",
  },

  bottomSpacer: {
    height: 20,
  },
});
