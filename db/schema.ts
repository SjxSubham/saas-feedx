import {
  integer,
  pgTable,
  serial,
  text,
  varchar,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name"),
  description: text("description"),
  url: text("url"),
  userId: varchar("user_id"),
  isActive: boolean("is_active").default(true),
  emailNotifications: boolean("email_notifications").default(false),
  notificationEmail: text("notification_email"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const projectsRelations = relations(projects, ({ many }) => ({
  feedbacks: many(feedbacks),
  activities: many(activities),
}));

export const feedbacks = pgTable("feedbacks", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id"),
  userName: text("user_name"),
  userEmail: text("user_email"),
  message: text("message"),
  rating: integer("rating"),
  isRead: boolean("is_read").default(false),
  isPinned: boolean("is_pinned").default(false),
  isArchived: boolean("is_archived").default(false),
  repliedAt: timestamp("replied_at"),
  replyMessage: text("reply_message"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const feedbacksRelations = relations(feedbacks, ({ one }) => ({
  project: one(projects, {
    fields: [feedbacks.projectId],
    references: [projects.id],
  }),
}));

export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id"),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  subscribed: boolean("subscribed"),
});

// New: Activities table for activity log
export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id"),
  userId: varchar("user_id"),
  action: text("action"), // 'feedback_received', 'project_updated', 'feedback_replied', etc.
  description: text("description"),
  metadata: text("metadata"), // JSON string for additional data
  createdAt: timestamp("created_at").defaultNow(),
});

export const activitiesRelations = relations(activities, ({ one }) => ({
  project: one(projects, {
    fields: [activities.projectId],
    references: [projects.id],
  }),
}));

// New: Notifications table for in-app notifications
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id"),
  projectId: integer("project_id"),
  feedbackId: integer("feedback_id"),
  type: text("type"), // 'new_feedback', 'reply_sent', etc.
  title: text("title"),
  message: text("message"),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const notificationsRelations = relations(notifications, ({ one }) => ({
  project: one(projects, {
    fields: [notifications.projectId],
    references: [projects.id],
  }),
  feedback: one(feedbacks, {
    fields: [notifications.feedbackId],
    references: [feedbacks.id],
  }),
}));
