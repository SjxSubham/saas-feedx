CREATE TABLE IF NOT EXISTS "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"description" text,
	"phone" varchar(256),
	"url" text,
	"user_id" varchar
);
