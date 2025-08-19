import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";

export const coursesTable = pgTable("courses", {
    id: uuid().primaryKey().defaultRandom(),
    title: text("title").notNull().unique(),
    description: text("description"),
});

export const usersTable = pgTable("users", {
    id: uuid().primaryKey().defaultRandom(),
    name: text("name").notNull(),
    email: text("email").unique(),
});     

export const enrollmentsTable = pgTable("enrollments", {
    id: uuid().primaryKey().defaultRandom(),
    userId: uuid("user_id").references(() => usersTable.id),
    courseId: uuid("course_id").references(() => coursesTable.id),
    createdAt: timestamp("created_at").defaultNow(),
});
