# React-i18next Setup Guide for StudyApp

## Library Information

- **Library ID**: `/i18next/react-i18next`
- **Description**: Internationalization for react done right. Using the i18next i18n ecosystem.
- **Reputation**: High
- **Benchmark Score**: 82.75
- **Code Snippets**: 268

## Installation

For React Native/Expo projects, install react-i18next v10+ (requires React Native v0.59.0+):

```bash
npm install react-i18next i18next
# or
yarn add react-i18next i18next
```

For Expo projects, you may also need:
```bash
npm install i18next-browser-languagedetector
# or for React Native
npm install react-native-localize
```

## Basic Setup

### 1. Create i18n configuration file

Create `lib/i18n.ts`:

```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

// Import translation files
import en from '../locales/en/translation.json';
import pl from '../locales/pl/translation.json';

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3', // For React Native compatibility
    resources: {
      en: {
        translation: en,
      },
      pl: {
        translation: pl,
      },
    },
    lng: Localization.getLocales()[0]?.languageCode || 'en',
    fallbackLng: 'en',
    debug: __DEV__,
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false, // Recommended for React Native
    },
  });

export default i18n;
```

### 2. Create translation files

Create `locales/en/translation.json`:
```json
{
  "welcome": {
    "title": "Welcome to StudyApp",
    "subtitle": "Your learning companion"
  },
  "auth": {
    "login": "Sign In",
    "register": "Sign Up",
    "email": "Email",
    "password": "Password"
  }
}
```

Create `locales/pl/translation.json`:
```json
{
  "welcome": {
    "title": "Witaj w StudyApp",
    "subtitle": "Twój towarzysz nauki"
  },
  "auth": {
    "login": "Zaloguj się",
    "register": "Zarejestruj się",
    "email": "Email",
    "password": "Hasło"
  }
}
```

### 3. Initialize i18n in your app

Update `app/_layout.tsx`:

```typescript
import { useEffect } from "react";
import "../lib/i18n"; // Import i18n configuration

// ... rest of your code
```

## Usage

### Using useTranslation hook

```typescript
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';

export default function HomeScreen() {
  const { t, i18n } = useTranslation();

  return (
    <View>
      <Text>{t('welcome.title')}</Text>
      <Text>{t('welcome.subtitle')}</Text>
    </View>
  );
}
```

### Changing language

```typescript
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <View>
      <Button onPress={() => changeLanguage('en')} title="English" />
      <Button onPress={() => changeLanguage('pl')} title="Polski" />
    </View>
  );
}
```

### Using Trans component for complex translations

```typescript
import { Trans } from 'react-i18next';
import { Text } from 'react-native';

function WelcomeMessage() {
  return (
    <Trans
      i18nKey="welcome.description"
      values={{ appName: 'StudyApp' }}
      components={{
        bold: <Text style={{ fontWeight: 'bold' }} />,
      }}
    />
  );
}
```

## Best Practices for React Native/Expo

1. **Use `useSuspense: false`** - React Native doesn't support Suspense well
2. **Use `compatibilityJSON: 'v3'`** - For better React Native compatibility
3. **Detect device language** - Use `expo-localization` to detect user's preferred language
4. **Store language preference** - Use AsyncStorage to persist user's language choice
5. **Namespace organization** - Organize translations by feature (auth, study, profile, etc.)

## File Structure

```
StudyApp/
├── lib/
│   └── i18n.ts
├── locales/
│   ├── en/
│   │   ├── translation.json
│   │   ├── auth.json
│   │   └── common.json
│   └── pl/
│       ├── translation.json
│       ├── auth.json
│       └── common.json
```

## Resources

- [Official Documentation](https://react.i18next.com/)
- [GitHub Repository](https://github.com/i18next/react-i18next)
- [i18next Documentation](https://www.i18next.com/)

