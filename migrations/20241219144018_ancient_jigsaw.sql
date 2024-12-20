CREATE TABLE IF NOT EXISTS "feedbacks" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" varchar,
	"user_name" text,
	"user_email" text,
	"message" text
);
