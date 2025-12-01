import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useProfile } from "../../hooks/useProfile";
import { useAuth } from "../../context/AuthContext";
import Ionicons from "@expo/vector-icons/Ionicons";

const PROFILE_STORAGE_KEY = "@StudyApp:localProfile";

export default function EditProfileScreen() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { profile, refresh } = useProfile();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Load local profile data first, then override with server data if available
  useEffect(() => {
    const loadLocalProfile = async () => {
      try {
        const localData = await AsyncStorage.getItem(PROFILE_STORAGE_KEY);
        if (localData) {
          const localProfile = JSON.parse(localData);
          setFullName(localProfile.full_name || "");
          setUsername(localProfile.username || "");
          setBio(localProfile.bio || "");
          setWebsite(localProfile.website || "");
          setAvatarUri(localProfile.avatar_url || null);
        }
      } catch (error) {
        console.error("Error loading local profile:", error);
      }
    };

    loadLocalProfile();
  }, []);

  // Override with server data if available
  useEffect(() => {
    if (profile) {
      setFullName((profile.full_name as string) || "");
      setUsername((profile.username as string) || "");
      setBio((profile.bio as string) || "");
      setWebsite((profile.website as string) || "");
      setAvatarUri((profile.avatar_url as string) || null);
    }
  }, [profile]);

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          t("profile.edit.photoError"),
          "Permission to access camera roll is required!"
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setAvatarUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert(t("profile.edit.photoError"), String(error));
    }
  };

  const removePhoto = () => {
    Alert.alert(
      t("profile.edit.removePhoto"),
      "Are you sure you want to remove your profile photo?",
      [
        { text: t("common.cancel"), style: "cancel" },
        {
          text: t("common.delete"),
          style: "destructive",
          onPress: () => setAvatarUri(null),
        },
      ]
    );
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      // Save to local storage (temporary solution until backend is ready)
      const profileData = {
        full_name: fullName || null,
        username: username || null,
        bio: bio || null,
        website: website || null,
        avatar_url: avatarUri || null,
        updated_at: new Date().toISOString(),
      };

      await AsyncStorage.setItem(
        PROFILE_STORAGE_KEY,
        JSON.stringify(profileData)
      );

      // TODO: Implement actual save to Supabase when schema is ready
      // Example:
      // const { error } = await supabase
      //   .from("profiles")
      //   .upsert({
      //     id: user?.id,
      //     ...profileData,
      //   });
      // if (error) throw error;

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Refresh profile data (will try to fetch from server, but will use local as fallback)
      await refresh();

      Alert.alert(t("common.success"), t("profile.edit.saved"), [
        {
          text: t("common.confirm"),
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      console.error("Error saving profile:", error);
      Alert.alert(t("common.error"), t("profile.edit.error"));
    } finally {
      setIsSaving(false);
    }
  };

  const displayName =
    fullName || username || user?.email || "User";
  const initials = displayName?.trim().charAt(0).toUpperCase() || "?";

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>{t("profile.edit.title")}</Text>
        </View>

        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            {avatarUri ? (
              <Image source={{ uri: avatarUri }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>{initials}</Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.changePhotoButton}
              onPress={pickImage}
            >
              <Ionicons name="camera" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.avatarActions}>
            <TouchableOpacity
              style={styles.avatarActionButton}
              onPress={pickImage}
            >
              <Text style={styles.avatarActionText}>
                {t("profile.edit.changePhoto")}
              </Text>
            </TouchableOpacity>
            {avatarUri && (
              <TouchableOpacity
                style={[styles.avatarActionButton, styles.removeButton]}
                onPress={removePhoto}
              >
                <Text style={[styles.avatarActionText, styles.removeButtonText]}>
                  {t("profile.edit.removePhoto")}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Form Fields */}
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t("profile.edit.fullName")}</Text>
            <TextInput
              style={styles.input}
              placeholder={t("profile.edit.fullNamePlaceholder")}
              placeholderTextColor="#6b7280"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t("profile.edit.username")}</Text>
            <TextInput
              style={styles.input}
              placeholder={t("profile.edit.usernamePlaceholder")}
              placeholderTextColor="#6b7280"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t("profile.edit.bio")}</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder={t("profile.edit.bioPlaceholder")}
              placeholderTextColor="#6b7280"
              value={bio}
              onChangeText={setBio}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t("profile.edit.website")}</Text>
            <TextInput
              style={styles.input}
              placeholder={t("profile.edit.websitePlaceholder")}
              placeholderTextColor="#6b7280"
              value={website}
              onChangeText={setWebsite}
              autoCapitalize="none"
              keyboardType="url"
              autoCorrect={false}
            />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.button, styles.saveButton, isSaving && styles.buttonDisabled]}
            onPress={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.saveButtonText}>
                {t("profile.edit.save")}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => router.back()}
            disabled={isSaving}
          >
            <Text style={styles.cancelButtonText}>
              {t("profile.edit.cancel")}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#f1f5f9",
    letterSpacing: -0.5,
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: 32,
    gap: 16,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#334155",
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#1e293b",
    borderWidth: 3,
    borderColor: "#334155",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 48,
    fontWeight: "700",
    color: "#f1f5f9",
  },
  changePhotoButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#6366f1",
    borderWidth: 3,
    borderColor: "#0f172a",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarActions: {
    flexDirection: "row",
    gap: 12,
  },
  avatarActionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: "#1e293b",
    borderWidth: 1,
    borderColor: "#334155",
  },
  removeButton: {
    backgroundColor: "transparent",
    borderColor: "#f87171",
  },
  avatarActionText: {
    color: "#cbd5e1",
    fontSize: 14,
    fontWeight: "600",
  },
  removeButtonText: {
    color: "#f87171",
  },
  form: {
    gap: 20,
    marginBottom: 32,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    color: "#cbd5e1",
    fontSize: 14,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#f1f5f9",
    borderWidth: 1,
    borderColor: "#334155",
  },
  textArea: {
    minHeight: 100,
    paddingTop: 16,
  },
  actions: {
    gap: 12,
  },
  button: {
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#6366f1",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  cancelButton: {
    backgroundColor: "#1e293b",
    borderWidth: 1,
    borderColor: "#334155",
  },
  cancelButtonText: {
    color: "#94a3b8",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
});

