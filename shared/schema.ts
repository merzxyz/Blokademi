import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  walletAddress: text("wallet_address").notNull().unique(),
  role: text("role").notNull().default("student"),
  displayName: text("display_name"),
});

export const rooms = pgTable("rooms", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  capacity: integer("capacity").notNull(),
  building: text("building").notNull(),
  floor: integer("floor").notNull(),
  facilities: text("facilities").notNull().default(""),
  isAvailable: boolean("is_available").notNull().default(true),
});

export const classes = pgTable("classes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  code: text("code").notNull().unique(),
  credits: integer("credits").notNull(),
  semester: text("semester").notNull(),
  maxStudents: integer("max_students").notNull(),
  description: text("description"),
});

export const lecturers = pgTable("lecturers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  walletAddress: text("wallet_address").notNull().unique(),
  name: text("name").notNull(),
  department: text("department").notNull(),
  specialization: text("specialization"),
  email: text("email"),
});

export const schedules = pgTable("schedules", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  classId: varchar("class_id").notNull(),
  roomId: varchar("room_id").notNull(),
  lecturerId: varchar("lecturer_id").notNull(),
  dayOfWeek: integer("day_of_week").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  status: text("status").notNull().default("pending"),
  semester: text("semester").notNull(),
  txHash: text("tx_hash"),
  validatedBy: text("validated_by"),
  validatedAt: text("validated_at"),
});

export const transactions = pgTable("transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  txHash: text("tx_hash").notNull(),
  timestamp: text("timestamp").notNull(),
  actionType: text("action_type").notNull(),
  actorWallet: text("actor_wallet").notNull(),
  entityType: text("entity_type").notNull(),
  entityId: text("entity_id").notNull(),
  details: text("details").notNull(),
  status: text("status").notNull().default("confirmed"),
  blockNumber: integer("block_number"),
  gasUsed: text("gas_used"),
});

export const enrollments = pgTable("enrollments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentWallet: text("student_wallet").notNull(),
  classId: varchar("class_id").notNull(),
  semester: text("semester").notNull(),
  enrolledAt: text("enrolled_at").notNull(),
  txHash: text("tx_hash"),
});

export const changeRequests = pgTable("change_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  scheduleId: varchar("schedule_id").notNull(),
  requestedBy: text("requested_by").notNull(),
  requestType: text("request_type").notNull(),
  reason: text("reason").notNull(),
  newData: text("new_data"),
  status: text("status").notNull().default("pending"),
  createdAt: text("created_at").notNull(),
  resolvedAt: text("resolved_at"),
  resolvedBy: text("resolved_by"),
  txHash: text("tx_hash"),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertRoomSchema = createInsertSchema(rooms).omit({ id: true });
export const insertClassSchema = createInsertSchema(classes).omit({ id: true });
export const insertLecturerSchema = createInsertSchema(lecturers).omit({ id: true });
export const insertScheduleSchema = createInsertSchema(schedules).omit({ id: true });
export const insertTransactionSchema = createInsertSchema(transactions).omit({ id: true });
export const insertEnrollmentSchema = createInsertSchema(enrollments).omit({ id: true });
export const insertChangeRequestSchema = createInsertSchema(changeRequests).omit({ id: true });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertRoom = z.infer<typeof insertRoomSchema>;
export type Room = typeof rooms.$inferSelect;

export type InsertClass = z.infer<typeof insertClassSchema>;
export type Class = typeof classes.$inferSelect;

export type InsertLecturer = z.infer<typeof insertLecturerSchema>;
export type Lecturer = typeof lecturers.$inferSelect;

export type InsertSchedule = z.infer<typeof insertScheduleSchema>;
export type Schedule = typeof schedules.$inferSelect;

export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactions.$inferSelect;

export type InsertEnrollment = z.infer<typeof insertEnrollmentSchema>;
export type Enrollment = typeof enrollments.$inferSelect;

export type InsertChangeRequest = z.infer<typeof insertChangeRequestSchema>;
export type ChangeRequest = typeof changeRequests.$inferSelect;

export type UserRole = "admin" | "lecturer" | "student";
export type ScheduleStatus = "pending" | "validated" | "conflict" | "archived";
export type ChangeRequestStatus = "pending" | "approved" | "rejected";
export type TransactionStatus = "pending" | "confirmed" | "failed";
