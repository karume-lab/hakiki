import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const party = sqliteTable("party", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  abbreviation: text("abbreviation"),
  logoUrl: text("logo_url"),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
});

export const constituency = sqliteTable("constituency", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  county: text("county").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
});

export const candidate = sqliteTable("candidate", {
  id: text("id").primaryKey(),
  mzalendoId: text("mzalendo_id").unique(),
  fullName: text("full_name").notNull(),
  slug: text("slug").notNull().unique(),
  partyId: text("party_id").references(() => party.id),
  constituencyId: text("constituency_id").references(() => constituency.id),
  position: text("position").notNull(), // MP, Governor, Senator, etc.
  gender: text("gender"),
  email: text("email"),
  phone: text("phone"),
  socials: text("socials"), // JSON string for { twitter, facebook, etc }
  termHistory: text("term_history"), // JSON string
  image: text("image"),
  bio: text("bio"),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
});

export const sourceDocument = sqliteTable("source_document", {
  id: text("id").primaryKey(),
  source: text("source").notNull(), // IEBC, ORPP, Gazette
  url: text("url").notNull(),
  filename: text("filename"),
  hash: text("hash"),
  status: text("status").notNull(), // discovered, downloaded, parsed, error
  politicianId: text("politician_id").references(() => politician.id),
  metadata: text("metadata"), // JSON string for extra info
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
});
