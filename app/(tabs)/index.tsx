import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { mockCourseMaterials } from "../../data/mockData";
import { useProfile } from "../../hooks/useProfile";

export default function HomeScreen() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { profile } = useProfile();

  const displayName = 
    (profile?.full_name as string | undefined) || 
    (profile?.username as string | undefined) || 
    user?.email?.split('@')[0] || 
    "Student";

  const courseMaterials = mockCourseMaterials;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{t("home.welcome")}</Text>
          <Text style={styles.userName}>{displayName}</Text>
        </View>
        <View style={styles.planBadge}>
          <Text style={styles.planText}>{t("home.plan.basic")}</Text>
        </View>
      </View>

      {/* Progress Card */}
      <View style={styles.progressCard}>
        <View style={styles.cardContent}>
          <View style={styles.cardTextContainer}>
            <View style={styles.newBadge}>
              <Text style={styles.newBadgeText}>{t("home.progress.badge")}</Text>
            </View>
            <Text style={styles.cardTitle}>{t("home.progress.title")}</Text>
            <Text style={styles.cardSubtitle}>{t("home.progress.subtitle")}</Text>
          </View>
          <View style={styles.progressIconContainer}>
            <Ionicons name="trending-up" size={40} color="#c0f000" />
          </View>
        </View>
      </View>

      {/* Course Materials Card */}
      <View style={styles.materialsCard}>
        <View style={styles.materialsHeader}>
          <View>
            <Text style={styles.materialsTitle}>{t("home.materials.title")}</Text>
            <View style={styles.usersRow}>
              <Ionicons name="people" size={16} color="#94a3b8" />
              <Text style={styles.usersText}>{t("home.materials.activeUsers", { count: courseMaterials.activeUsers })}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>{t("home.materials.startButton")}</Text>
            <Ionicons name="arrow-forward" size={18} color="#0f172a" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>{t("home.materials.upgradeButton")}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Sections Grid */}
      <View style={styles.sectionsGrid}>
        <Link href="/(modals)/vocabulary" asChild>
        <TouchableOpacity style={styles.sectionCard}>
          <View style={styles.sectionIconContainer}>
            <Ionicons name="book" size={32} color="#c0f000" />
          </View>
          <Text style={styles.sectionTitle}>{t("home.sections.vocabulary.title")}</Text>
          <Text style={styles.sectionSubtitle}>{t("home.sections.vocabulary.subtitle")}</Text>
        </TouchableOpacity>
        </Link>

        <TouchableOpacity style={styles.sectionCard}>
          <View style={styles.sectionIconContainer}>
            <Ionicons name="headset" size={32} color="#c0f000" />
          </View>
          <Text style={styles.sectionTitle}>{t("home.sections.listening.title")}</Text>
          <Text style={styles.sectionSubtitle}>{t("home.sections.listening.subtitle")}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sectionCard}>
          <View style={styles.sectionIconContainer}>
            <Ionicons name="create" size={32} color="#c0f000" />
          </View>
          <Text style={styles.sectionTitle}>{t("home.sections.grammar.title")}</Text>
          <Text style={styles.sectionSubtitle}>{t("home.sections.grammar.subtitle")}</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Spacing for Navigation */}
      <View style={styles.bottomSpacer} />
    </ScrollView>
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
    paddingBottom: 100, // Space for tab bar
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
  planBadge: {
    backgroundColor: "#1e293b",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#334155",
  },
  planText: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  // Progress Card
  progressCard: {
    backgroundColor: "#1e293b",
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#334155",
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTextContainer: {
    flex: 1,
  },
  newBadge: {
    backgroundColor: "#c0f000",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 12,
  },
  newBadgeText: {
    color: "#0f172a",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#f1f5f9",
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#94a3b8",
    fontWeight: "500",
  },
  progressIconContainer: {
    width: 70,
    height: 70,
    backgroundColor: "#0f172a",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#334155",
  },

  // Materials Card
  materialsCard: {
    backgroundColor: "#1e293b",
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#334155",
  },
  materialsHeader: {
    marginBottom: 20,
  },
  materialsTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#f1f5f9",
    marginBottom: 8,
  },
  usersRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  usersText: {
    fontSize: 13,
    color: "#94a3b8",
    fontWeight: "500",
  },
  actionButtons: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: "#c0f000",
    borderRadius: 14,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  primaryButtonText: {
    color: "#0f172a",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1.5,
    borderColor: "#334155",
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#94a3b8",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 1.2,
  },

  // Sections Grid
  sectionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 24,
  },
  sectionCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: "#1e293b",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#334155",
    alignItems: "center",
  },
  sectionIconContainer: {
    width: 64,
    height: 64,
    backgroundColor: "#0f172a",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#334155",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#f1f5f9",
    marginBottom: 4,
    textAlign: "center",
  },
  sectionSubtitle: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "500",
    textAlign: "center",
  },

  bottomSpacer: {
    height: 20,
  },
});
