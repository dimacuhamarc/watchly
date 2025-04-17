import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  jsonb,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

import { type WatchlistItemStatusType } from "~/utils/types/data";
import { type MediaType } from "~/utils/types/data";

export const createTable = pgTableCreator((name) => `watchly_${name}`);

export const users = createTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  password_hash: varchar("password_hash", { length: 255 }).notNull(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  first_name: varchar("first_name", { length: 255 }),
  last_name: varchar("last_name", { length: 255 }),
  display_name: varchar("display_name", { length: 255 }),
  profile_picture: varchar("profile_picture", { length: 255 }),
  bio: varchar("bio", { length: 360 }),
  public_profile: boolean("public_profile").notNull().default(true),
  location: varchar("location", { length: 255 }),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const follow = createTable("follow", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => users.id),
  followedUserId: varchar("followed_user_id", { length: 255 })
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const favorites = createTable("favorite", {
  id: varchar("id", { length: 255 }).primaryKey().unique().notNull(),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => users.id)
    .unique(),
  movieIds: jsonb("movie_ids").array(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const watchlist = createTable("watchlist", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => users.id),
  movieIds: jsonb("movie_ids").array(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const watchlistItems = createTable("watchlist_item", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  watchlistId: integer("watchlist_id")
    .notNull()
    .references(() => watchlist.id),
  movieId: integer("movie_id").notNull(),
  status: varchar("status", { length: 255 })
    .$type<WatchlistItemStatusType>()
    .notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const movies = createTable("movie", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  tmdbId: integer("tmdb_id").notNull(),
  type: varchar("type", { length: 255 }).$type<MediaType>().notNull(),
});

export const usersRelations = relations(users, ({ many, one }) => ({
  accounts: many(accounts),
  favorites: one(favorites, {
    fields: [users.id],
    references: [favorites.userId],
  }),
}));

export const accounts = createTable(
  "account",
  {
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_user_id_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("session_token", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_user_id_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

export const favoritesRelations = relations(favorites, ({ one }) => ({
  user: one(users, { fields: [favorites.userId], references: [users.id] }),
}));
