import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SettingsScreen() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const getLanguageName = (code: string) => {
    return code === "en"
      ? t("profile.settings.english")
      : t("profile.settings.polish");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t("profile.settings.title")}</Text>
        <View style={styles.languageSection}>
          <Text style={styles.languageLabel}>
            {t("profile.settings.currentLanguage")}: {getLanguageName(i18n.language)}
          </Text>
          <View style={styles.languageButtons}>
            <TouchableOpacity
              style={[
                styles.languageButton,
                i18n.language === "en" && styles.languageButtonActive,
              ]}
              onPress={() => changeLanguage("en")}
            >
              <Text
                style={[
                  styles.languageButtonText,
                  i18n.language === "en" && styles.languageButtonTextActive,
                ]}
              >
                {t("profile.settings.english")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.languageButton,
                i18n.language === "pl" && styles.languageButtonActive,
              ]}
              onPress={() => changeLanguage("pl")}
            >
              <Text
                style={[
                  styles.languageButtonText,
                  i18n.language === "pl" && styles.languageButtonTextActive,
                ]}
              >
                {t("profile.settings.polish")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 32,
    gap: 16,
  },
  card: {
    backgroundColor: "#1e293b",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#334155",
    gap: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#f1f5f9",
  },
  languageSection: {
    gap: 12,
  },
  languageLabel: {
    color: "#cbd5e1",
    fontSize: 14,
    fontWeight: "600",
  },
  languageButtons: {
    flexDirection: "row",
    gap: 12,
  },
  languageButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#334155",
    alignItems: "center",
  },
  languageButtonActive: {
    backgroundColor: "#6366f1",
    borderColor: "#6366f1",
  },
  languageButtonText: {
    color: "#94a3b8",
    fontSize: 14,
    fontWeight: "600",
  },
  languageButtonTextActive: {
    color: "#fff",
    fontWeight: "700",
  },
});
