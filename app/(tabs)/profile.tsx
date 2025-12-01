import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { useProfile } from "../../hooks/useProfile";

type InfoRowProps = {
  label: string;
  value?: string | null;
};

const InfoRow = ({ label, value }: InfoRowProps) => {
  if (value === undefined || value === null) return null;

  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
};

const formatDateTime = (value?: string | null) => {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return date.toLocaleString();
};

export default function ProfileScreen() {
  const { t, i18n } = useTranslation();
  const { user, signOut } = useAuth();
  const { profile, isLoading, error, notFound, refresh } = useProfile();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const getLanguageName = (code: string) => {
    return code === "en" ? t("profile.settings.english") : t("profile.settings.polish");
  };

  const displayName =
    (profile?.full_name as string | undefined) ||
    (profile?.username as string | undefined) ||
    user?.email ||
    "Authenticated user";

  const initials =
    displayName?.trim().charAt(0).toUpperCase() ||
    user?.email?.charAt(0).toUpperCase() ||
    "?";

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>{displayName}</Text>
          {user?.email ? <Text style={styles.subtitle}>{user.email}</Text> : null}
          <Text style={styles.status}>{t("profile.signedIn")}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t("profile.account")}</Text>
        <InfoRow label={t("profile.userId")} value={user?.id} />
        <InfoRow
          label={t("profile.createdAt")}
          value={formatDateTime(user?.created_at)}
        />
        <InfoRow
          label={t("profile.lastSignIn")}
          value={formatDateTime(user?.last_sign_in_at)}
        />
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{t("profile.profile")}</Text>
          <TouchableOpacity
            onPress={refresh}
            style={styles.refreshButton}
            disabled={isLoading}
          >
            <Text style={styles.refreshText}>
              {isLoading ? t("common.loading") : t("profile.refresh")}
            </Text>
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <ActivityIndicator color="#6366f1" style={styles.loader} />
        ) : (
          <>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            {notFound ? (
              <Text style={styles.mutedText}>{t("profile.noProfile")}</Text>
            ) : null}
            {profile ? (
              <>
                <InfoRow
                  label={t("profile.fullName")}
                  value={profile.full_name as string}
                />
                <InfoRow
                  label={t("profile.username")}
                  value={profile.username as string}
                />
                <InfoRow label={t("profile.bio")} value={profile.bio as string} />
                <InfoRow label={t("profile.profileId")} value={profile.id} />
                <InfoRow
                  label={t("profile.updatedAt")}
                  value={formatDateTime(profile.updated_at as string)}
                />
              </>
            ) : null}
          </>
        )}
      </View>

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

      <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
        <Text style={styles.signOutText}>{t("home.signOut")}</Text>
      </TouchableOpacity>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#1e293b",
    borderWidth: 1,
    borderColor: "#334155",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#f1f5f9",
  },
  headerText: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#f1f5f9",
    letterSpacing: -0.25,
  },
  subtitle: {
    fontSize: 14,
    color: "#94a3b8",
  },
  status: {
    fontSize: 12,
    color: "#22c55e",
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  card: {
    backgroundColor: "#1e293b",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#334155",
    gap: 12,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#f1f5f9",
  },
  refreshButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#334155",
  },
  refreshText: {
    color: "#cbd5e1",
    fontSize: 12,
    fontWeight: "700",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  rowLabel: {
    color: "#94a3b8",
    fontSize: 14,
    flex: 1,
  },
  rowValue: {
    color: "#f1f5f9",
    fontSize: 14,
    flex: 1,
    textAlign: "right",
  },
  loader: {
    marginTop: 8,
  },
  mutedText: {
    color: "#94a3b8",
    fontSize: 14,
    lineHeight: 20,
  },
  errorText: {
    color: "#f87171",
    fontSize: 14,
    marginBottom: 4,
  },
  signOutButton: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f87171",
    marginTop: 8,
  },
  signOutText: {
    color: "#f87171",
    fontSize: 16,
    fontWeight: "700",
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
