
import { integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

const created_at = timestamp({ withTimezone: true })
	.notNull()
	.defaultNow()
const updated_at = timestamp({ withTimezone: true })
	.notNull()
	.defaultNow()
	.$onUpdate(() => new Date())

export const user = pgTable("users", {
  id: varchar({ length: 500 }).notNull().primaryKey(),
  nipy_nisn: varchar({ length: 255 }).unique(),
  fullname: varchar({ length: 255 }),
  avatar_url: varchar({ length: 500 }), //https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8_LpRm4tYP6WUAec9I_hQ8sX8M86lkEqKqw&s
  gender: varchar({ length: 5 }),
  bio: varchar({ length: 500 }),
  city: varchar({ length: 255 }),
  username: varchar({ length: 255 }).unique(),
  status: varchar().default("Belum Aktif"),
  role: varchar().default("User"),
  email: varchar({ length: 255 }).notNull().unique(),
  whatsapp: varchar({ length: 255 }),
  created_at,
  updated_at,
});

export const position = pgTable("positions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
  created_at,
  updated_at,
});

export const url = pgTable("urls", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  url: varchar().notNull(),
  user_id: varchar({ length: 500 }).notNull(),
  created_at,
  updated_at,
});

export const fighter = pgTable("fighters", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	user_id: varchar({ length: 500 }).notNull().references(() => user.id),
	position_id: integer("position_id").references(() => position.id),
	created_at,
	updated_at,
})

export const userLogActivities = pgTable("user_log_activities", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	user_id: varchar({ length: 500 }).notNull().references(() => user.id),
  action: varchar("action").notNull(), // contoh: "login", "logout", "update_profile"
  description: text("description"),
  created_at,
  updated_at,
});
