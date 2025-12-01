import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { readFileSync } from "fs";
import { join } from "path";

// Load .env file if it exists
try {
  const envPath = join(process.cwd(), ".env");
  const envContent = readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split("=");
    if (key && valueParts.length > 0) {
      const value = valueParts.join("=").trim().replace(/^["']|["']$/g, "");
      process.env[key.trim()] = value;
    }
  });
} catch (error) {
  console.log("⚠️  No .env file found, using environment variables");
}

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

interface TableInfo {
  table_name: string;
  columns: ColumnInfo[];
  primary_keys: string[];
  foreign_keys: ForeignKeyInfo[];
}

interface ColumnInfo {
  column_name: string;
  data_type: string;
  is_nullable: string;
  column_default: string | null;
}

interface ForeignKeyInfo {
  constraint_name: string;
  column_name: string;
  foreign_table_name: string;
  foreign_column_name: string;
}

async function getDatabaseSchema() {
  console.log("🔍 Fetching database schema from Supabase...\n");

  try {
    // Get all user tables (exclude system tables)
    const { data: tables, error: tablesError } = await supabase.rpc("exec_sql", {
      query: `
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_type = 'BASE TABLE'
        AND table_name NOT LIKE 'pg_%'
        AND table_name NOT LIKE '_%'
        ORDER BY table_name;
      `,
    });

    if (tablesError) {
      // Try alternative method using direct SQL query
      const { data: tablesData, error } = await supabase
        .from("information_schema.tables")
        .select("table_name")
        .eq("table_schema", "public")
        .eq("table_type", "BASE TABLE");

      if (error) {
        console.log("⚠️  Cannot access information_schema directly.");
        console.log("📋 Trying to list tables from Supabase...\n");

        // Try to get tables by querying common Supabase tables
        const commonTables = [
          "users",
          "profiles",
          "auth.users",
          "public.users",
          "public.profiles",
        ];

        const schema: TableInfo[] = [];

        for (const tableName of commonTables) {
          try {
            const { data, error: queryError } = await supabase
              .from(tableName)
              .select("*")
              .limit(0);

            if (!queryError) {
              console.log(`✅ Found table: ${tableName}`);
              schema.push({
                table_name: tableName,
                columns: [],
                primary_keys: [],
                foreign_keys: [],
              });
            }
          } catch (e) {
            // Table doesn't exist or no access
          }
        }

        if (schema.length === 0) {
          console.log(
            "📝 No custom tables found. Your database might only have the default Supabase auth tables.\n"
          );
          console.log(
            "💡 Default Supabase tables (managed by Supabase):\n" +
              "  - auth.users (user accounts)\n" +
              "  - auth.sessions (active sessions)\n" +
              "  - auth.refresh_tokens (refresh tokens)\n"
          );
        }

        return schema;
      }

      const tableNames = tablesData?.map((t: any) => t.table_name) || [];
      return await getTablesDetails(tableNames);
    }

    const tableNames =
      tables?.map((t: any) => t.table_name) ||
      tables?.map((t: any) => t) ||
      [];

    return await getTablesDetails(tableNames);
  } catch (error: any) {
    console.error("❌ Error fetching schema:", error.message);
    return [];
  }
}

async function getTablesDetails(tableNames: string[]): Promise<TableInfo[]> {
  const schema: TableInfo[] = [];

  for (const tableName of tableNames) {
    try {
      // Get columns
      const { data: columns, error: columnsError } = await supabase
        .from(tableName)
        .select("*")
        .limit(0);

      if (columnsError) {
        console.log(`⚠️  Cannot access table: ${tableName}`);
        continue;
      }

      // Try to get column info by attempting a select with limit 0
      // This won't work for schema inspection, so we'll use a different approach
      const tableInfo: TableInfo = {
        table_name: tableName,
        columns: [],
        primary_keys: [],
        foreign_keys: [],
      };

      schema.push(tableInfo);
    } catch (error) {
      console.log(`⚠️  Error accessing table: ${tableName}`);
    }
  }

  return schema;
}

async function main() {
  const schema = await getDatabaseSchema();

  if (schema.length === 0) {
    console.log(
      "\n📊 Database Schema Summary:\n" +
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
        "No custom tables found in the public schema.\n\n" +
        "Your Supabase project currently only uses the default authentication tables.\n" +
        "To create custom tables, go to:\n" +
        "  https://app.supabase.com → Table Editor → New Table\n"
    );
    return;
  }

  console.log("\n📊 Database Schema Summary:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  schema.forEach((table) => {
    console.log(`📋 Table: ${table.table_name}`);
    if (table.columns.length > 0) {
      console.log("   Columns:");
      table.columns.forEach((col) => {
        const nullable = col.is_nullable === "YES" ? "NULL" : "NOT NULL";
        const defaultVal = col.column_default
          ? ` DEFAULT ${col.column_default}`
          : "";
        console.log(
          `     - ${col.column_name}: ${col.data_type} ${nullable}${defaultVal}`
        );
      });
    } else {
      console.log("   (Column details not available via API)");
    }
    if (table.primary_keys.length > 0) {
      console.log(`   Primary Keys: ${table.primary_keys.join(", ")}`);
    }
    if (table.foreign_keys.length > 0) {
      console.log("   Foreign Keys:");
      table.foreign_keys.forEach((fk) => {
        console.log(
          `     - ${fk.column_name} → ${fk.foreign_table_name}.${fk.foreign_column_name}`
        );
      });
    }
    console.log("");
  });

  console.log(
    "💡 To see full schema details, check:\n" +
      "  https://app.supabase.com → Table Editor\n"
  );
}

main().catch(console.error);

