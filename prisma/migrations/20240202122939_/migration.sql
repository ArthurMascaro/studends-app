/*
  Warnings:

  - You are about to drop the `days` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `weeks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `date` on the `lessons` table. All the data in the column will be lost.
  - You are about to drop the column `owing` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `day_id` on the `lectures` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "days";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "weeks";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_lessons" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "startAt" DATETIME NOT NULL,
    "endAt" DATETIME NOT NULL,
    "value" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_lessons" ("created_at", "endAt", "id", "startAt", "updated_at", "value") SELECT "created_at", "endAt", "id", "startAt", "updated_at", "value" FROM "lessons";
DROP TABLE "lessons";
ALTER TABLE "new_lessons" RENAME TO "lessons";
CREATE TABLE "new_users" (
    "cpf" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "motherName" TEXT NOT NULL,
    "bornDate" DATETIME NOT NULL,
    "grade" TEXT NOT NULL,
    "observation" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_users" ("bornDate", "cpf", "created_at", "grade", "motherName", "name", "observation", "updated_at") SELECT "bornDate", "cpf", "created_at", "grade", "motherName", "name", "observation", "updated_at" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE TABLE "new_lectures" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_cpf" TEXT NOT NULL,
    "lesson_id" TEXT NOT NULL,
    "payed" BOOLEAN NOT NULL DEFAULT false,
    "presence" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "lectures_user_cpf_fkey" FOREIGN KEY ("user_cpf") REFERENCES "users" ("cpf") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "lectures_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_lectures" ("created_at", "id", "lesson_id", "payed", "presence", "updated_at", "user_cpf") SELECT "created_at", "id", "lesson_id", "payed", "presence", "updated_at", "user_cpf" FROM "lectures";
DROP TABLE "lectures";
ALTER TABLE "new_lectures" RENAME TO "lectures";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
