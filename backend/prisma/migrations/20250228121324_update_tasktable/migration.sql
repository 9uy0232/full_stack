/*
  Warnings:

  - Made the column `status` on table `tasktable` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `tasktable` MODIFY `status` ENUM('Pending', 'In Progress', 'Completed') NOT NULL DEFAULT 'Pending';
