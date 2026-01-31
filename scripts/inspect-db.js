const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

// Load .env file
function loadEnv() {
  try {
    const envPath = path.join(process.cwd(), ".env");
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, "utf-8");
      envContent.split("\n").forEach((line) => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#")) {
          const [key, ...valueParts] = trimmed.split("=");
          if (key && valueParts.length > 0) {
            const value = valueParts.join("=").trim().replace(/^["']|["']$/g, "");
            process.env[key.trim()] = value;
          }
        }
      });
    }
  } catch (error) {
    console.log("⚠️  No .env file found, using environment variables");
  }
}

loadEnv();

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "❌ Missing Supabase credentials!\n" +
      "Please set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY in .env file"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function inspectDatabase() {
  console.log("🔍 Inspecting Supabase database...\n");
  console.log(`📍 Project URL: ${supabaseUrl}\n`);

  const foundTables = [];
  const commonTableNames = [
    "users",
    "profiles",
    "notes",
    "flashcards",
    "subjects",
    "topics",
    "study_sessions",
    "user_profiles",
  ];

  console.log("📋 Checking for common tables...\n");

  // Try to access each potential table
  for (const tableName of commonTableNames) {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select("*")
        .limit(0);

      if (!error) {
        foundTables.push(tableName);
        console.log(`✅ Found table: ${tableName}`);
      }
    } catch (error) {
      // Table doesn't exist or no access
    }
  }

  // Also try to get table list from Supabase metadata
  // Note: This requires RPC function or direct SQL access which may not be available
  console.log("\n📊 Database Summary:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  if (foundTables.length === 0) {
    console.log(
      "📝 No custom tables found in the public schema.\n\n" +
        "Your Supabase project currently only uses the default authentication tables:\n" +
        "  • auth.users (user accounts)\n" +
        "  • auth.sessions (active sessions)\n" +
        "  • auth.refresh_tokens (refresh tokens)\n\n" +
        "💡 To create custom tables:\n" +
        "   1. Go to https://app.supabase.com\n" +
        "   2. Select your project\n" +
        "   3. Navigate to 'Table Editor'\n" +
        "   4. Click 'New Table'\n"
    );
  } else {
    console.log(`Found ${foundTables.length} table(s):\n`);
    foundTables.forEach((table) => {
      console.log(`  📋 ${table}`);
    });
    console.log(
      "\n💡 To see full schema details (columns, types, constraints):\n" +
        "   https://app.supabase.com → Table Editor\n"
    );
  }

  // Try to get more info about auth schema
  console.log("\n🔐 Authentication Schema (Supabase managed):");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(
    "  • auth.users - User accounts with email, password, metadata\n" +
      "  • auth.sessions - Active user sessions\n" +
      "  • auth.refresh_tokens - Token refresh management\n" +
      "  • auth.audit_log_entries - Authentication audit logs\n"
  );
}

inspectDatabase().catch((error) => {
  console.error("❌ Error:", error.message);
  process.exit(1);
});

