import Ionicons from "@expo/vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import { mockLessons, type Lesson } from "../../data/mockData";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString(undefined, {
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    day: "numeric",
    month: "short",
  });

export default function CalendarScreen() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const plan =
    (user?.app_metadata as any)?.plan ??
    (user?.user_metadata as any)?.plan ??
    null;

  const hasAccess = plan === "premium" || plan === "pro" || plan === "paid";

  const handleJoin = (lesson: Lesson) => {
    if (!hasAccess) return;
    console.log("Join lesson:", lesson.id);
  };

  return (
    <SafeAreaProvider>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Text style={styles.title}>{t("calendarScreen.title")}</Text>
          <Text style={styles.subtitle}>{t("calendarScreen.subtitle")}</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleRow}>
              <Ionicons name="calendar-outline" size={22} color="#c0f000" />
              <Text style={styles.cardTitle}>
                {t("calendarScreen.upcoming")}
              </Text>
            </View>
          </View>

          {!hasAccess ? (
            <View style={styles.lockBadge}>
              <Ionicons name="lock-closed" size={14} color="#0f172a" />
              <Text style={styles.lockBadgeText}>
                {t("calendarScreen.locked")}
              </Text>
            </View>
          ) : null}

          {!hasAccess ? (
            <Text style={styles.lockedDesc}>
              {t("calendarScreen.lockedDescription")}
            </Text>
          ) : null}

          <View style={styles.list}>
            {mockLessons.map((lesson) => (
              <View key={lesson.id} style={styles.lesson}>
                <View style={styles.lessonLeft}>
                  <View style={styles.iconCircle}>
                    <Ionicons name="videocam" size={18} color="#c0f000" />
                  </View>
                  <View style={styles.texts}>
                    <Text style={styles.lessonTitle}>{lesson.title}</Text>
                    <Text style={styles.meta}>
                      {t("calendarScreen.startAt", {
                        date: formatDate(lesson.startsAt),
                      })}
                    </Text>
                    <Text style={styles.meta}>
                      {t("calendarScreen.duration", {
                        minutes: lesson.duration,
                      })}{" "}
                      · {t("calendarScreen.level", { level: lesson.level })}
                    </Text>
                    <Text style={styles.meta}>
                      {t("calendarScreen.teacher", { teacher: lesson.teacher })}{" "}
                      ·{" "}
                      {t("calendarScreen.location", {
                        location: lesson.location,
                      })}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={[styles.joinBtn, !hasAccess && styles.joinBtnDisabled]}
                  disabled={!hasAccess}
                  onPress={() => handleJoin(lesson)}
                >
                  <Ionicons
                    name={hasAccess ? "play" : "lock-closed"}
                    size={16}
                    color="#0f172a"
                  />
                  <Text style={styles.joinText}>
                    {hasAccess
                      ? t("calendarScreen.join")
                      : t("calendarScreen.joinLocked")}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a" },
  content: { paddingHorizontal: 24, paddingTop: 60, paddingBottom: 100 },
  header: { marginBottom: 24, gap: 8 },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#f1f5f9",
    letterSpacing: -0.5,
  },
  subtitle: { fontSize: 15, color: "#94a3b8", lineHeight: 22 },
  card: {
    backgroundColor: "#1e293b",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#334155",
    gap: 14,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitleRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  cardTitle: { fontSize: 18, fontWeight: "700", color: "#f1f5f9" },
  lockBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#c0f000",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  lockBadgeText: { color: "#0f172a", fontSize: 12, fontWeight: "800" },
  lockedDesc: { color: "#94a3b8", fontSize: 13, lineHeight: 20 },
  list: { gap: 12 },
  lesson: {
    backgroundColor: "#0f172a",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#334155",
    padding: 14,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  lessonLeft: { flex: 1, flexDirection: "row", gap: 12 },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#1e293b",
    borderWidth: 1,
    borderColor: "#334155",
    alignItems: "center",
    justifyContent: "center",
  },
  texts: { flex: 1, gap: 4 },
  lessonTitle: { color: "#f1f5f9", fontSize: 15, fontWeight: "700" },
  meta: { color: "#94a3b8", fontSize: 12, fontWeight: "600" },
  joinBtn: {
    backgroundColor: "#c0f000",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  joinBtnDisabled: { backgroundColor: "#334155" },
  joinText: { color: "#0f172a", fontSize: 13, fontWeight: "800" },
});
