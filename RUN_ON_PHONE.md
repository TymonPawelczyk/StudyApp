# 📱 Jak uruchomić aplikację na telefonie

## Metoda 1: Expo Go (Najłatwiejsza) ⭐

### Krok 1: Zainstaluj Expo Go na telefonie

**Android:**
- Pobierz z Google Play Store: [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent)

**iOS:**
- Pobierz z App Store: [Expo Go](https://apps.apple.com/app/expo-go/id982107779)

### Krok 2: Uruchom Expo na komputerze

```bash
npx expo start
```

### Krok 3: Połącz telefon z komputerem

**Opcja A: QR Code (Rekomendowane)**
1. Otwórz aplikację **Expo Go** na telefonie
2. W terminalu zobaczysz **QR code**
3. **Android**: Naciśnij "Scan QR code" w Expo Go
4. **iOS**: Otwórz aplikację **Kamera** i zeskanuj QR code (automatycznie otworzy Expo Go)

**Opcja B: Tunneling (jeśli QR nie działa)**
```bash
npx expo start --tunnel
```
- Użyj tego jeśli telefon i komputer są w różnych sieciach WiFi
- Zeskanuj QR code który się pojawi

**Opcja C: Manualne połączenie**
1. Upewnij się, że telefon i komputer są w **tej samej sieci WiFi**
2. W terminalu zobaczysz adres IP, np: `exp://192.168.1.100:8081`
3. W Expo Go wybierz "Enter URL manually" i wklej ten adres

---

## Metoda 2: Development Build (Zaawansowana)

Jeśli potrzebujesz natywnych modułów, które nie działają w Expo Go:

### Android:
```bash
npx expo run:android
```

### iOS:
```bash
npx expo run:ios
```

**Wymagania:**
- Android: Android Studio + Android SDK
- iOS: Xcode (tylko macOS)

---

## 🔧 Rozwiązywanie problemów

### Problem: "Unable to connect to Expo"
**Rozwiązanie:**
1. Sprawdź czy telefon i komputer są w tej samej sieci WiFi
2. Użyj `--tunnel`: `npx expo start --tunnel`
3. Sprawdź firewall na komputerze

### Problem: QR code się nie skanuje
**Rozwiązanie:**
1. Użyj opcji manualnej (Opcja C powyżej)
2. Sprawdź czy port 8081 nie jest zablokowany
3. Spróbuj `--tunnel`

### Problem: Aplikacja się nie ładuje
**Rozwiązanie:**
1. Sprawdź czy `.env` ma poprawne klucze Supabase
2. Sprawdź logi w terminalu
3. Zrestartuj Expo: `Ctrl+C` i ponownie `npx expo start`

---

## 📝 Szybki start

```bash
# 1. Przejdź do katalogu projektu
cd /Users/tomaszszewczyk/Developer/StudyApp

# 2. Uruchom Expo
npx expo start

# 3. Zeskanuj QR code w Expo Go na telefonie
```

---

## 💡 Wskazówki

- **Hot Reload**: Zmiany w kodzie automatycznie odświeżają się na telefonie
- **Shake phone**: Potrząśnij telefonem, aby otworzyć menu deweloperskie
- **Logi**: Zobacz logi aplikacji w terminalu gdzie działa Expo


