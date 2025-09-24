/*
  Warnings:

  - Added the required column `date` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `from` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Order" ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "from" TEXT NOT NULL,
ADD COLUMN     "returnDate" TEXT,
ADD COLUMN     "returnTime" TEXT,
ADD COLUMN     "roundTrip" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "time" TEXT NOT NULL,
ADD COLUMN     "to" TEXT NOT NULL;
