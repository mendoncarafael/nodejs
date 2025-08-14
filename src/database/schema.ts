import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const courses = pgTable("courses", {
    id: uuid().primaryKey().defaultRandom(),
    title: text("title").notNull().unique(),
    description: text("description"),
});

export const users = pgTable("users", {
    id: uuid().primaryKey().defaultRandom(),
    name: text("name").notNull(),
    email: text("email").unique(),
});     