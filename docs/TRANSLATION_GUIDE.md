# 📚 Przewodnik po Tłumaczeniach (Translation Guide)

Ten przewodnik wyjaśnia, jak dodawać i zarządzać tłumaczeniami w aplikacji StudyApp.

## 📋 Spis Treści

1. [Struktura Plików](#struktura-plików)
2. [Jak Dodać Nowe Tłumaczenie](#jak-dodać-nowe-tłumaczenie)
3. [Używanie Tłumaczeń w Komponentach](#używanie-tłumaczeń-w-komponentach)
4. [Zmiana Języka](#zmiana-języka)
5. [Best Practices](#best-practices)
6. [Przykłady](#przykłady)

---

## 📁 Struktura Plików

Pliki tłumaczeń znajdują się w katalogu `locales/`:

```
locales/
├── en/
│   └── translation.json    # Tłumaczenia angielskie
└── pl/
    └── translation.json    # Tłumaczenia polskie
```

Każdy plik JSON zawiera zagnieżdżoną strukturę kluczy tłumaczeń:

```json
{
  "auth": {
    "login": {
      "title": "StudyApp",
      "subtitle": "Welcome back"
    }
  }
}
```

---

## ➕ Jak Dodać Nowe Tłumaczenie

### Krok 1: Dodaj Klucz do Pliku Angielskiego

Otwórz `locales/en/translation.json` i dodaj nowy klucz w odpowiedniej sekcji:

```json
{
  "auth": {
    "login": {
      "title": "StudyApp",
      "subtitle": "Welcome back",
      "newKey": "New translation text"  // ← Dodaj tutaj
    }
  }
}
```

### Krok 2: Dodaj Tłumaczenie Polskie

Otwórz `locales/pl/translation.json` i dodaj ten sam klucz z polskim tłumaczeniem:

```json
{
  "auth": {
    "login": {
      "title": "StudyApp",
      "subtitle": "Witaj ponownie",
      "newKey": "Nowy tekst tłumaczenia"  // ← Dodaj tutaj
    }
  }
}
```

### Krok 3: Użyj w Komponencie

```typescript
import { useTranslation } from "react-i18next";

function MyComponent() {
  const { t } = useTranslation();
  
  return <Text>{t("auth.login.newKey")}</Text>;
}
```

---

## 🎯 Używanie Tłumaczeń w Komponentach

### Podstawowe Użycie

```typescript
import { useTranslation } from "react-i18next";
import { Text } from "react-native";

function MyComponent() {
  const { t } = useTranslation();
  
  return <Text>{t("auth.login.title")}</Text>;
}
```

### Tłumaczenia z Parametrami

Jeśli tłumaczenie zawiera zmienne, użyj drugiego parametru:

**W pliku JSON:**
```json
{
  "welcome": {
    "message": "Hello {{name}}, you have {{count}} messages"
  }
}
```

**W komponencie:**
```typescript
const { t } = useTranslation();

<Text>{t("welcome.message", { name: "John", count: 5 })}</Text>
// Wynik: "Hello John, you have 5 messages"
```

### Tłumaczenia z Pluralizacją

i18next automatycznie obsługuje pluralizację:

**W pliku JSON:**
```json
{
  "items": {
    "one": "{{count}} item",
    "other": "{{count}} items"
  }
}
```

**W komponencie:**
```typescript
<Text>{t("items", { count: 1 })}</Text>  // "1 item"
<Text>{t("items", { count: 5 })}</Text>  // "5 items"
```

---

## 🌍 Zmiana Języka

### Programatyczna Zmiana Języka

```typescript
import { useTranslation } from "react-i18next";
import { TouchableOpacity, Text } from "react-native";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    // Język jest automatycznie zapisywany w AsyncStorage
  };

  return (
    <View>
      <TouchableOpacity onPress={() => changeLanguage("en")}>
        <Text>English</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => changeLanguage("pl")}>
        <Text>Polski</Text>
      </TouchableOpacity>
    </View>
  );
}
```

### Sprawdzanie Aktualnego Języka

```typescript
const { i18n } = useTranslation();

console.log(i18n.language); // "en" lub "pl"
```

---

## ✅ Best Practices

### 1. Organizacja Kluczy

Używaj logicznej struktury zagnieżdżonej:

✅ **Dobrze:**
```json
{
  "auth": {
    "login": {
      "title": "Login",
      "button": "Sign In"
    },
    "register": {
      "title": "Register",
      "button": "Sign Up"
    }
  }
}
```

❌ **Źle:**
```json
{
  "authLoginTitle": "Login",
  "authLoginButton": "Sign In",
  "authRegisterTitle": "Register"
}
```

### 2. Spójne Nazewnictwo

Używaj camelCase dla kluczy:

✅ **Dobrze:**
```json
{
  "auth": {
    "login": {
      "emailPlaceholder": "your@email.com"
    }
  }
}
```

❌ **Źle:**
```json
{
  "auth": {
    "login": {
      "email-placeholder": "your@email.com"
    }
  }
}
```

### 3. Grupowanie Według Funkcjonalności

Grupuj tłumaczenia według funkcji ekranu/komponentu:

```json
{
  "auth": { /* ... */ },
  "home": { /* ... */ },
  "profile": { /* ... */ },
  "common": { /* ... */ }
}
```

### 4. Używaj Sekcji `common`

Dla często używanych tekstów (przyciski, komunikaty):

```json
{
  "common": {
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "loading": "Loading...",
    "error": "Error"
  }
}
```

### 5. Nie Tłumacz Nazw Własnych

Nie tłumacz nazw aplikacji, marek, nazw własnych:

```json
{
  "app": {
    "name": "StudyApp"  // Zawsze "StudyApp", nie tłumaczymy
  }
}
```

---

## 📝 Przykłady

### Przykład 1: Prosty Komponent z Tłumaczeniami

```typescript
import { View, Text, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";

export default function LoginButton() {
  const { t } = useTranslation();

  return (
    <TouchableOpacity>
      <Text>{t("auth.login.signIn")}</Text>
    </TouchableOpacity>
  );
}
```

### Przykład 2: Formularz z Tłumaczeniami

```typescript
import { View, Text, TextInput } from "react-native";
import { useTranslation } from "react-i18next";

export default function LoginForm() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");

  return (
    <View>
      <Text>{t("auth.login.email")}</Text>
      <TextInput
        placeholder={t("auth.login.emailPlaceholder")}
        value={email}
        onChangeText={setEmail}
      />
    </View>
  );
}
```

### Przykład 3: Komunikat Błędu z Parametrem

**W `translation.json`:**
```json
{
  "errors": {
    "fieldRequired": "Field {{fieldName}} is required"
  }
}
```

**W komponencie:**
```typescript
const { t } = useTranslation();

<Text style={styles.error}>
  {t("errors.fieldRequired", { fieldName: t("auth.login.email") })}
</Text>
// Wynik: "Field Email is required"
```

### Przykład 4: Warunkowe Tłumaczenia

```typescript
const { t } = useTranslation();
const isLoggedIn = true;

<Text>
  {isLoggedIn 
    ? t("home.welcomeBack") 
    : t("home.welcomeNew")
  }
</Text>
```

---

## 🔍 Sprawdzanie Tłumaczeń

### W Trybie Deweloperskim

W pliku `lib/i18n.ts` ustawiono `debug: __DEV__`, więc w konsoli zobaczysz:
- Brakujące klucze tłumaczeń
- Używane klucze
- Informacje o zmianie języka

### Sprawdzanie Brakujących Kluczy

Jeśli użyjesz klucza, który nie istnieje, zobaczysz w konsoli:
```
i18next: missingKey en translation auth.login.missingKey auth.login.missingKey
```

---

## 🚀 Dodawanie Nowego Języka

### Krok 1: Utwórz Katalog

```bash
mkdir -p locales/de
```

### Krok 2: Utwórz Plik Tłumaczeń

Skopiuj strukturę z `locales/en/translation.json` i przetłumacz:

```bash
cp locales/en/translation.json locales/de/translation.json
```

### Krok 3: Zaktualizuj Konfigurację

W `lib/i18n.ts` dodaj nowy język:

```typescript
import de from "../locales/de/translation.json";

i18n.init({
  resources: {
    en: { translation: en },
    pl: { translation: pl },
    de: { translation: de },  // ← Dodaj tutaj
  },
  // ...
});
```

### Krok 4: Zaktualizuj Language Detector

Upewnij się, że nowy język jest w liście obsługiwanych:

```typescript
const supportedLanguages = ["en", "pl", "de"];  // ← Dodaj "de"
```

---

## ❓ Często Zadawane Pytania

### Q: Czy muszę dodawać tłumaczenie dla każdego języka?

**A:** Tak! Każdy klucz musi istnieć we wszystkich plikach językowych. Jeśli nie dodasz tłumaczenia, zostanie użyty klucz lub fallback language (angielski).

### Q: Jak obsłużyć teksty dynamiczne (np. z API)?

**A:** Teksty z API zwykle nie wymagają tłumaczenia (są już w odpowiednim języku). Jeśli jednak musisz je przetłumaczyć, użyj parametrów:

```typescript
t("api.message", { message: apiResponse.message })
```

### Q: Czy mogę używać HTML w tłumaczeniach?

**A:** W React Native nie używamy HTML. Zamiast tego użyj komponentu `Trans` z react-i18next dla złożonych tłumaczeń z komponentami React Native.

### Q: Jak przetestować tłumaczenia?

**A:** 
1. Zmień język w aplikacji
2. Sprawdź czy wszystkie teksty się zmieniają
3. Sprawdź konsolę pod kątem brakujących kluczy
4. Przetestuj na różnych urządzeniach z różnymi językami systemowymi

---

## 📚 Dodatkowe Zasoby

- [Dokumentacja react-i18next](https://react.i18next.com/)
- [Dokumentacja i18next](https://www.i18next.com/)
- [Przewodnik konfiguracji i18n](./i18n-setup.md)

---

## 🐛 Rozwiązywanie Problemów

### Problem: Tłumaczenia nie działają

**Rozwiązanie:**
1. Sprawdź czy zaimportowałeś `useTranslation` z `react-i18next`
2. Sprawdź czy dodałeś `import "../lib/i18n"` w `app/_layout.tsx`
3. Sprawdź czy klucz istnieje w obu plikach językowych
4. Sprawdź konsolę pod kątem błędów

### Problem: Język się nie zmienia

**Rozwiązanie:**
1. Sprawdź czy wywołałeś `i18n.changeLanguage(lng)`
2. Sprawdź czy język jest w `supportedLanguages`
3. Sprawdź czy język jest dodany w `resources` w `lib/i18n.ts`

### Problem: Brakujące tłumaczenia

**Rozwiązanie:**
1. Upewnij się, że dodałeś klucz we wszystkich plikach językowych
2. Sprawdź czy struktura JSON jest poprawna (brak przecinków na końcu)
3. Zrestartuj aplikację po dodaniu nowych tłumaczeń

---

**Ostatnia aktualizacja:** 2025-12-01

