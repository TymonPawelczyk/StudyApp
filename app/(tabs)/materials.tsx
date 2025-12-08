import Ionicons from "@expo/vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import { mockMaterials, type CourseMaterial } from "../../data/mockData";

export default function MaterialsScreen() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const plan =
    (user?.app_metadata as any)?.plan ??
    (user?.user_metadata as any)?.plan ??
    null;

  const hasAccess =
    plan === "premium" || plan === "pro" || plan === "paid" || plan === null;

  const materials: CourseMaterial[] = mockMaterials;

  return (
    <SafeAreaProvider>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{t("materialsScreen.title")}</Text>
          <Text style={styles.subtitle}>{t("materialsScreen.subtitle")}</Text>
        </View>

        {!hasAccess ? (
          <View style={styles.lockedCard}>
            <Ionicons name="lock-closed" size={28} color="#c0f000" />
            <Text style={styles.lockedTitle}>{t("materialsScreen.lockedTitle")}</Text>
            <Text style={styles.lockedDesc}>{t("materialsScreen.lockedDescription")}</Text>
            <View style={styles.lockedActions}>
              <TouchableOpacity style={styles.primaryBtn}>
                <Text style={styles.primaryBtnText}>{t("materialsScreen.upgradeButton")}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryBtn}>
                <Text style={styles.secondaryBtnText}>{t("materialsScreen.contactButton")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.listCard}>
            <Text style={styles.sectionTitle}>{t("materialsScreen.available")}</Text>
            <View style={styles.list}>
              {materials.map((item) => (
                <View key={item.id} style={styles.item}>
                  <View style={styles.itemLeft}>
                    <View style={styles.iconCircle}>
                      <Ionicons
                        name={
                          item.format === "Video"
                            ? "videocam"
                            : item.format === "PDF"
                            ? "document-text"
                            : "musical-notes"
                        }
                        size={18}
                        color="#c0f000"
                      />
                    </View>
                    <View style={styles.texts}>
                      <View style={styles.titleRow}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        {item.isNew ? (
                          <View style={styles.newBadge}>
                            <Text style={styles.newBadgeText}>{t("materialsScreen.new")}</Text>
                          </View>
                        ) : null}
                      </View>
                      <Text style={styles.itemDesc}>{item.description}</Text>
                      <View style={styles.metaRow}>
                        <Text style={styles.meta}>
                          {t("materialsScreen.duration", { minutes: item.minutes })}
                        </Text>
                        <Text style={styles.meta}>{t("materialsScreen.level", { level: item.level })}</Text>
                        <Text style={styles.meta}>{t("materialsScreen.format", { format: item.format })}</Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.playBtn}>
                    <Ionicons name="arrow-forward" size={16} color="#0f172a" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a" },
  content: { paddingHorizontal: 24, paddingTop: 60, paddingBottom: 100 },
  header: { gap: 8, marginBottom: 24 },
  title: { fontSize: 28, fontWeight: "800", color: "#f1f5f9", letterSpacing: -0.5 },
  subtitle: { fontSize: 15, color: "#94a3b8", lineHeight: 22 },
  lockedCard: {
    backgroundColor: "#1e293b",
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "#334155",
    gap: 12,
  },
  lockedTitle: { fontSize: 18, fontWeight: "700", color: "#f1f5f9" },
  lockedDesc: { fontSize: 14, color: "#94a3b8", lineHeight: 20 },
  lockedActions: { flexDirection: "row", gap: 12, marginTop: 4 },
  primaryBtn: {
    flex: 1,
    backgroundColor: "#c0f000",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryBtnText: { color: "#0f172a", fontSize: 14, fontWeight: "800", letterSpacing: 0.3 },
  secondaryBtn: {
    flex: 1,
    borderColor: "#334155",
    borderWidth: 1,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  secondaryBtnText: { color: "#94a3b8", fontSize: 14, fontWeight: "700" },
  listCard: {
    backgroundColor: "#1e293b",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#334155",
  },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#f1f5f9", marginBottom: 12 },
  list: { gap: 14 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#0f172a",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#334155",
  },
  itemLeft: { flex: 1, flexDirection: "row", gap: 12 },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#1e293b",
    borderWidth: 1,
    borderColor: "#334155",
    alignItems: "center",
    justifyContent: "center",
  },
  texts: { flex: 1, gap: 6 },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  itemTitle: { color: "#f1f5f9", fontSize: 15, fontWeight: "700" },
  itemDesc: { color: "#94a3b8", fontSize: 13, lineHeight: 18 },
  metaRow: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  meta: { color: "#cbd5e1", fontSize: 12, fontWeight: "600" },
  newBadge: {
    backgroundColor: "#c0f000",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  newBadgeText: { color: "#0f172a", fontSize: 10, fontWeight: "900", letterSpacing: 0.5 },
  playBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#c0f000",
    alignItems: "center",
    justifyContent: "center",
  },
});