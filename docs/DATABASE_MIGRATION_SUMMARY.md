# Podsumowanie Migracji Bazy Danych

## 📅 Data wykonania: 15 grudnia 2025

## ✅ Wykonane migracje (10 kroków)

### 1. **create_roles_and_statuses_tables**
- Utworzono tabele słownikowe `roles` i `statuses`
- Dodano domyślne dane: role (admin, teacher, student) i statusy (active, inactive, new)
- Utworzono indeksy dla wydajności

### 2. **extend_profiles_table**
- Rozszerzono istniejącą tabelę `profiles` o:
  - `name` - imię użytkownika
  - `surname` - nazwisko użytkownika
  - `role_id` - powiązanie z tabelą roles (domyślnie: student)
  - `status_id` - powiązanie z tabelą statuses (domyślnie: new)
  - `bio` - biografia użytkownika
- Zaktualizowano istniejące profile wartościami domyślnymi

### 3. **create_courses_tables**
- Utworzono ENUM `language_level` (A1-C2)
- Utworzono tabelę `courses` z:
  - UUID jako klucz główny
  - Poziomy językowe (ENUM)
  - Właściciel kursu (FK do profiles)
  - Unikalny identyfikator kursu
- Utworzono tabelę łączącą `user_courses` (many-to-many)
- Utworzono widok `courses_with_stats` z licznikiem członków (zamiast redundantnej kolumny)

### 4. **create_activities_tables**
- Utworzono ENUM `activity_type` (test, lesson, quiz, homework)
- Utworzono tabelę `activities` dla zadań/testów/lekcji
- Utworzono tabelę `activity_results` dla wyników użytkowników
- Utworzono widok `user_activity_stats` dla statystyk

### 5. **create_timetables_table_fixed**
- Włączono rozszerzenie `btree_gist`
- Utworzono ENUM `day_of_week`
- Utworzono tabelę `timetables` z harmonogramem zajęć
- Zaimplementowano trigger `check_timetable_overlap()` zapobiegający kolizjom czasowym
- Utworzono widok `weekly_schedule`

### 6. **create_announcements_tables**
- Utworzono tabelę `announcements` dla ogłoszeń (globalnych i kursowych)
- Utworzono tabelę `user_announcements` do śledzenia przeczytanych ogłoszeń
- Utworzono widok `unread_announcements`

### 7. **create_study_sessions_and_stats**
- Utworzono ENUM `session_type` (study, practice, review, test)
- Utworzono tabelę `study_sessions` do logowania aktywności nauki
- Utworzono widoki dla statystyk:
  - `user_weekly_stats` - statystyki 7-dniowe (zamiast sztywnych kolumn day_minus_X)
  - `user_daily_activity` - dzienna aktywność
  - `course_stats` - statystyki kursów (30-dniowe)

### 8. **create_auto_profile_trigger**
- Utworzono funkcję `handle_new_user()` z prawidłowym `search_path`
- Utworzono trigger `on_auth_user_created` automatycznie tworzący profil po rejestracji
- Dodano obsługę `unique_violation` (jeśli profil już istnieje)

### 9. **enable_rls_and_policies**
- Włączono RLS na wszystkich tabelach
- Utworzono polityki bezpieczeństwa dla:
  - `roles`, `statuses` - tylko odczyt dla zalogowanych
  - `profiles` - odczyt dla wszystkich zalogowanych, edycja własnego profilu
  - `courses` - tworzenie tylko dla nauczycieli/adminów, zarządzanie przez właścicieli
  - `user_courses` - zapisywanie/wypisywanie się z kursów
  - `activities` - dostęp dla członków kursu i właścicieli

### 10. **enable_rls_policies_continued**
- Kontynuacja polityk RLS dla pozostałych tabel:
  - `activity_results` - użytkownicy widzą swoje wyniki, nauczyciele wszystkie w swoich kursach
  - `timetables` - członkowie kursu widzą harmonogram, właściciele zarządzają
  - `announcements` - globalne dla wszystkich, kursowe dla członków
  - `user_announcements` - oznaczanie jako przeczytane
  - `study_sessions` - użytkownicy zarządzają swoimi sesjami

### 11. **fix_security_issues**
- Poprawiono wszystkie widoki na `security_invoker = true` (zamiast SECURITY DEFINER)
- Dodano `SET search_path = public, pg_temp` do funkcji triggerowych
- Przeniesiono rozszerzenie `btree_gist` do schematu `extensions`

## 🏗️ Struktura schematu

### Tabele główne:
1. **profiles** (rozszerzona) - profile użytkowników
2. **roles** - role (admin, teacher, student)
3. **statuses** - statusy użytkowników (active, inactive, new)
4. **courses** - kursy językowe z poziomami A1-C2
5. **user_courses** - zapisani użytkownicy (many-to-many)
6. **activities** - zadania/testy/lekcje
7. **activity_results** - wyniki użytkowników
8. **timetables** - harmonogram zajęć z zabezpieczeniem przed kolizjami
9. **announcements** - ogłoszenia (globalne i kursowe)
10. **user_announcements** - śledzenie przeczytania
11. **study_sessions** - logowanie sesji nauki

### ENUM Types:
- `language_level`: A1, A2, B1, B2, C1, C2
- `activity_type`: test, lesson, quiz, homework
- `day_of_week`: monday-sunday
- `session_type`: study, practice, review, test

### Widoki (Views):
- `courses_with_stats` - kursy z liczbą członków
- `user_activity_stats` - statystyki aktywności użytkownika
- `weekly_schedule` - harmonogram tygodniowy
- `user_weekly_stats` - statystyki 7-dniowe
- `user_daily_activity` - dzienna aktywność
- `unread_announcements` - nieprzeczytane ogłoszenia
- `course_stats` - statystyki kursów (30-dniowe)

## 🔐 Bezpieczeństwo (RLS)

✅ Row Level Security włączony na wszystkich tabelach
✅ Polityki dostępu zgodne z rolami (admin, teacher, student)
✅ Użytkownicy mogą edytować tylko swoje dane
✅ Nauczyciele zarządzają swoimi kursami
✅ Członkowie kursów widzą tylko zawartość swoich kursów

## ⚠️ Pozostałe ostrzeżenia

### Security (WARN):
- **Leaked Password Protection** - Supabase Auth ma wyłączoną ochronę przed wyciekami haseł. Zalecane włączenie w ustawieniach projektu: [Link do dokumentacji](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection)

### Performance (WARN):
- **Auth RLS InitPlan** - Niektóre polityki RLS mogą być zoptymalizowane poprzez użycie `(SELECT auth.uid())` zamiast `auth.uid()`. To opcjonalna optymalizacja dla bardzo dużych zbiorów danych.
- **Multiple Permissive Policies** - Niektóre tabele mają wiele polityk permissive (np. profiles ma starą i nową politykę). W przyszłości można je połączyć dla lepszej wydajności.
- **Unused Indexes** - Nowo utworzone indeksy pokazują się jako "nieużywane", ponieważ baza nie ma jeszcze danych. To normalne zachowanie.

## 📊 Zgodność z wymaganiami

✅ **Integracja z Supabase Auth** - `profiles` połączone z `auth.users`
✅ **Role i statusy** - Słowniki z wartościami domyślnymi
✅ **Brak redundancji** - Statystyki wyliczane dynamicznie (widoki)
✅ **Ochrona przed kolizjami** - Trigger dla harmonogramu
✅ **Row Level Security** - Włączony dla wszystkich tabel
✅ **Automatic Profile Creation** - Trigger po rejestracji
✅ **Search Path Security** - Wszystkie funkcje z bezpiecznym search_path
✅ **Security Invoker Views** - Widoki respektują uprawnienia użytkownika

## 🚀 Następne kroki

1. **Włącz leaked password protection** w ustawieniach Supabase Auth
2. **Opcjonalnie**: Zoptymalizuj polityki RLS używając `(SELECT auth.uid())`
3. **Opcjonalnie**: Połącz wielokrotne permissive policies dla lepszej wydajności
4. **Zacznij używać** nowego schematu w aplikacji React Native

## 📝 Uwagi techniczne

- Wszystkie tabele używają UUID jako kluczy głównych
- Timestamps używają `timezone('utc'::text, now())`
- Foreign keys mają odpowiednie akcje `ON DELETE` (CASCADE lub SET NULL)
- Indeksy utworzone dla wszystkich kluczy obcych i często zapytywanych kolumn
- ENUM types zapewniają spójność danych
