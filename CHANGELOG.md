# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- 2025-12-01 - Tomasz Szewczyk: Database inspection scripts (`scripts/inspect-db.js`, `scripts/inspect-db-details.js`) to analyze Supabase database structure
- 2025-12-01 - Tomasz Szewczyk: Architecture rules documentation (`.cursor/rules/app-architecture.mdc`) defining project structure and coding standards
- 2025-12-01 - Tomasz Szewczyk: Changelog rules (`.cursor/rules/changelog.mdc`) for maintaining project changelog
- 2025-12-01 - Tomasz Szewczyk: Internationalization (i18n) support using react-i18next and i18next libraries
- 2025-12-01 - Tomasz Szewczyk: i18n configuration file (`lib/i18n.ts`) with automatic language detection and AsyncStorage persistence
- 2025-12-01 - Tomasz Szewczyk: Translation files for English (`locales/en/translation.json`) and Polish (`locales/pl/translation.json`)
- 2025-12-01 - Tomasz Szewczyk: Language switcher button in profile screen with visual indicator for active language
- 2025-12-01 - Tomasz Szewczyk: Translation guide documentation (`docs/TRANSLATION_GUIDE.md`) with instructions for adding and managing translations
- 2025-12-01 - Tomasz Szewczyk: i18n setup documentation (`docs/i18n-setup.md`) with configuration examples

### Changed
- 2025-12-01 - Tomasz Szewczyk: Improved project documentation structure with Cursor rules
- 2025-12-01 - Tomasz Szewczyk: Updated login screen (`app/(auth)/login.tsx`) to use i18n translations
- 2025-12-01 - Tomasz Szewczyk: Updated register screen (`app/(auth)/register.tsx`) to use i18n translations
- 2025-12-01 - Tomasz Szewczyk: Updated home screen (`app/(tabs)/index.tsx`) to use i18n translations
- 2025-12-01 - Tomasz Szewczyk: Updated profile screen (`app/(tabs)/profile.tsx`) to use i18n translations and added language switcher

### Documentation
- 2025-12-01 - Tomasz Szewczyk: Added database schema inspection capabilities
- 2025-12-01 - Tomasz Szewczyk: Documented current database structure: `profiles` table with user profile fields (id, username, full_name, avatar_url, website, updated_at)
- 2025-12-01 - Tomasz Szewczyk: Added comprehensive translation guide with examples, best practices, and troubleshooting
