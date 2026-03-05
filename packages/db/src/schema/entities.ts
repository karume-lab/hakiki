import { relations } from "drizzle-orm";
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

export const politician = sqliteTable("politician", {
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

export const politicianRelations = relations(politician, ({ one }) => ({
  party: one(party, {
    fields: [politician.partyId],
    references: [party.id],
  }),
  constituency: one(constituency, {
    fields: [politician.constituencyId],
    references: [constituency.id],
  }),
}));

export const constituencyRelations = relations(constituency, ({ many }) => ({
  politicians: many(politician),
}));

export const partyRelations = relations(party, ({ many }) => ({
  politicians: many(politician),
}));

export const sourceDocumentRelations = relations(sourceDocument, ({ one }) => ({
  politician: one(politician, {
    fields: [sourceDocument.politicianId],
    references: [politician.id],
  }),
}));

export const spendingLimit = sqliteTable("spending_limit", {
  id: text("id").primaryKey(),
  constituencyId: text("constituency_id").references(() => constituency.id),
  entityName: text("entity_name").notNull(),
  entityType: text("entity_type").notNull(), // 'county' | 'constituency'
  areaSqKm: integer("area_sq_km"),
  registeredVoters: integer("registered_voters"),
  limitKes: integer("limit_kes").notNull(),
  year: integer("year").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
});
