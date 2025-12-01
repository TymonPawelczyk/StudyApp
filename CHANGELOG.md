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
- 2025-12-01 - Tomasz Szewczyk: Profile management feature with edit screen (`app/(tabs)/edit-profile.tsx`) for editing user profile data
- 2025-12-01 - Tomasz Szewczyk: Profile image picker functionality using `expo-image-picker` library for selecting and managing profile photos
- 2025-12-01 - Tomasz Szewczyk: Local profile data storage using AsyncStorage as temporary solution until backend schema is ready
- 2025-12-01 - Tomasz Szewczyk: Profile edit form with fields for full name, username, bio, and website
- 2025-12-01 - Tomasz Szewczyk: Avatar display with image support and fallback to initials when no photo is set
- 2025-12-01 - Tomasz Szewczyk: Edit profile button integration in profile screen header and profile card section

### Changed
- 2025-12-01 - Tomasz Szewczyk: Improved project documentation structure with Cursor rules
- 2025-12-01 - Tomasz Szewczyk: Updated login screen (`app/(auth)/login.tsx`) to use i18n translations
- 2025-12-01 - Tomasz Szewczyk: Updated register screen (`app/(auth)/register.tsx`) to use i18n translations
- 2025-12-01 - Tomasz Szewczyk: Updated home screen (`app/(tabs)/index.tsx`) to use i18n translations
- 2025-12-01 - Tomasz Szewczyk: Updated profile screen (`app/(tabs)/profile.tsx`) to use i18n translations and added language switcher
- 2025-12-01 - Tomasz Szewczyk: Enhanced `useProfile` hook (`hooks/useProfile.ts`) to support local profile data fallback from AsyncStorage when server data is unavailable
- 2025-12-01 - Tomasz Szewczyk: Added profile editing translations for English and Polish languages in translation files
- 2025-12-01 - Tomasz Szewczyk: Updated profile screen to display profile avatar image when available, with fallback to user initials
- 2025-12-01 - Tomasz Szewczyk: Added edit-profile route to tabs layout with hidden tab bar entry (accessible only via navigation)

### Documentation
- 2025-12-01 - Tomasz Szewczyk: Added database schema inspection capabilities
- 2025-12-01 - Tomasz Szewczyk: Documented current database structure: `profiles` table with user profile fields (id, username, full_name, avatar_url, website, updated_at)
- 2025-12-01 - Tomasz Szewczyk: Added comprehensive translation guide with examples, best practices, and troubleshooting

### Technical Details

#### Profile Management Implementation
- **Dependencies Added**: `expo-image-picker` for image selection functionality
- **New Screen**: `app/(tabs)/edit-profile.tsx` - Full-featured profile editing interface
- **Storage Solution**: AsyncStorage key `@StudyApp:localProfile` for temporary local data persistence
- **Image Handling**: 
  - Square crop aspect ratio (1:1) for profile photos
  - Image quality set to 0.8 for optimal file size
  - Permission handling for media library access
  - Remove photo functionality with confirmation dialog
- **Form Fields**: 
  - Full Name (text input with word capitalization)
  - Username (text input, no capitalization)
  - Bio (multiline textarea, 4 lines minimum)
  - Website (URL input with keyboard type optimization)
- **Data Flow**: 
  - Local data loads first from AsyncStorage
  - Server data (if available) merges with local data
  - Local data takes precedence for edited fields
  - Profile refresh updates both local and server data
- **User Experience**:
  - KeyboardAvoidingView for proper keyboard handling on iOS/Android
  - Loading states during save operations
  - Success/error alerts with user feedback
  - Automatic navigation back after successful save
  - Visual indicators for active edit mode
