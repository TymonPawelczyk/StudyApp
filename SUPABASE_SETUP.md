# 🔑 Jak uzyskać klucze Supabase

## Krok 1: Zaloguj się lub załóż konto

1. Wejdź na: https://app.supabase.com
2. Kliknij **"Sign Up Now"** (jeśli nie masz konta) lub **"Sign In"**
3. Możesz zalogować się przez GitHub lub email

## Krok 2: Stwórz nowy projekt

1. Po zalogowaniu kliknij **"New Project"** (zielony przycisk)
2. Wypełnij formularz:
   - **Name**: np. "StudyApp"
   - **Database Password**: wymyśl silne hasło (zapisz je!)
   - **Region**: wybierz najbliższy (np. Frankfurt)
3. Kliknij **"Create new project"**
4. Poczekaj 2-3 minuty aż projekt się utworzy

## Krok 3: Znajdź klucze API

1. W lewym menu bocznym kliknij **⚙️ Settings** (ikona koła zębatego na dole)
2. W menu Settings kliknij **"API"**
3. Zobaczysz dwie wartości:

   **a) Project URL:**
   - Znajdziesz go w sekcji **"Project URL"** na górze strony API
   - Lub w **Settings → General → Reference ID**
   ```
   https://xxxxxxxxxxxxx.supabase.co
   ```
   To jest Twój `EXPO_PUBLIC_SUPABASE_URL`

   **b) Publishable key:**
   - W sekcji **"Publishable and secret API keys"**
   - Kliknij przycisk **"Reveal"** obok "Publishable key"
   ```
   sb_publishable_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
   To jest Twój `EXPO_PUBLIC_SUPABASE_ANON_KEY`

## Krok 4: Wklej klucze do pliku .env

1. Otwórz plik `.env` w głównym katalogu projektu
2. Wklej swoje wartości:

```env
EXPO_PUBLIC_SUPABASE_URL=https://twoj-projekt.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

3. Zapisz plik

## Krok 5: Zrestartuj Expo

1. Zatrzymaj Expo (Ctrl+C w terminalu)
2. Uruchom ponownie: `npx expo start --web`

---

## ⚠️ Ważne:

- **Publishable key** jest bezpieczny do użycia w aplikacji mobilnej/webowej (można go udostępniać publicznie)
- **NIE udostępniaj** `Secret keys` - to są klucze administratora do użycia tylko na backendzie!
- Plik `.env` jest już w `.gitignore`, więc nie zostanie wrzucony do Git
- Upewnij się, że masz włączone **Row Level Security (RLS)** dla swoich tabel w Supabase

## 🆘 Problemy?

Jeśli nie widzisz opcji "Settings" lub "API":
- Upewnij się, że jesteś zalogowany
- Sprawdź czy projekt się już utworzył (może trwać kilka minut)
- Odśwież stronę (F5)

