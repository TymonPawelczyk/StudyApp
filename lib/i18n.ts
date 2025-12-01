import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import translation files
import en from "../locales/en/translation.json";
import pl from "../locales/pl/translation.json";

const LANGUAGE_STORAGE_KEY = "@StudyApp:language";

// Language detector that checks AsyncStorage first, then device locale
const languageDetector = {
  type: "languageDetector" as const,
  async: true,
  detect: async (callback: (lng: string) => void) => {
    try {
      // Try to get saved language preference
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (savedLanguage) {
        callback(savedLanguage);
        return;
      }
    } catch (error) {
      console.warn("Error reading language from storage:", error);
    }

    // Fallback to device locale
    const deviceLocale = Localization.getLocales()[0]?.languageCode || "en";
    const supportedLanguages = ["en", "pl"];
    const language = supportedLanguages.includes(deviceLocale)
      ? deviceLocale
      : "en";
    callback(language);
  },
  init: () => {},
  cacheUserLanguage: async (lng: string) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
    } catch (error) {
      console.warn("Error saving language to storage:", error);
    }
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3", // For React Native compatibility
    resources: {
      en: {
        translation: en,
      },
      pl: {
        translation: pl,
      },
    },
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false, // React Native already escapes values
    },
    react: {
      useSuspense: false, // Recommended for React Native
    },
  });

export default i18n;

