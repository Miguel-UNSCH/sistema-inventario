/*
  Warnings:

  - You are about to drop the `Productos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Productos";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Producto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ProductName" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "price" TEXT NOT NULL,
    "stock" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdById" INTEGER,
    CONSTRAINT "Producto_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Producto_code_key" ON "Producto"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Producto_code_category_key" ON "Producto"("code", "category");
