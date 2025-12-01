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
    console.log("⚠️  No .env file found");
  }
}

loadEnv();

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Missing Supabase credentials!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function getTableDetails(tableName) {
  console.log(`\n📋 Table: ${tableName}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  try {
    // Try to get one row to see the structure
    const { data, error } = await supabase
      .from(tableName)
      .select("*")
      .limit(1);

    if (error) {
      console.log(`❌ Error accessing table: ${error.message}`);
      return;
    }

    if (data && data.length > 0) {
      const row = data[0];
      console.log("\nColumns and sample data:\n");
      Object.keys(row).forEach((key) => {
        const value = row[key];
        const type = value === null ? "NULL" : typeof value;
        const displayValue =
          value === null
            ? "NULL"
            : typeof value === "object"
            ? JSON.stringify(value).substring(0, 50) + "..."
            : String(value).substring(0, 50);
        console.log(`  • ${key}: ${type} = ${displayValue}`);
      });
    } else {
      // Table exists but is empty, try to infer structure from Supabase metadata
      console.log("\n  (Table is empty - no rows to inspect)");
      console.log(
        "\n💡 To see full schema, check:\n" +
          "   https://app.supabase.com → Table Editor → " +
          tableName
      );
    }

    // Try to get row count
    const { count, error: countError } = await supabase
      .from(tableName)
      .select("*", { count: "exact", head: true });

    if (!countError && count !== null) {
      console.log(`\n  📊 Total rows: ${count}`);
    }
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
  }
}

async function inspectDatabase() {
  console.log("🔍 Detailed Database Inspection\n");
  console.log(`📍 Project URL: ${supabaseUrl}\n`);

  // Check profiles table
  await getTableDetails("profiles");

  console.log("\n\n📚 Default Supabase Tables (auth schema):");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(
    "These tables are managed by Supabase and cannot be accessed via PostgREST:\n" +
      "\n" +
      "  • auth.users\n" +
      "    - id (uuid, primary key)\n" +
      "    - email (text)\n" +
      "    - encrypted_password (text)\n" +
      "    - email_confirmed_at (timestamp)\n" +
      "    - created_at (timestamp)\n" +
      "    - updated_at (timestamp)\n" +
      "    - raw_user_meta_data (jsonb)\n" +
      "    - raw_app_meta_data (jsonb)\n\n" +
      "  • auth.sessions\n" +
      "    - id (uuid, primary key)\n" +
      "    - user_id (uuid, foreign key → auth.users)\n" +
      "    - expires_at (timestamp)\n" +
      "    - token (text)\n" +
      "    - created_at (timestamp)\n" +
      "    - updated_at (timestamp)\n\n" +
      "  • auth.refresh_tokens\n" +
      "    - id (bigint, primary key)\n" +
      "    - user_id (uuid, foreign key → auth.users)\n" +
      "    - token (text)\n" +
      "    - expires_at (timestamp)\n" +
      "    - created_at (timestamp)\n"
  );
}

inspectDatabase().catch((error) => {
  console.error("❌ Error:", error.message);
  process.exit(1);
});

