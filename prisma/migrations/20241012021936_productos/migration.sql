-- CreateTable
CREATE TABLE "Productos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ProductName" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "price" TEXT NOT NULL,
    "stock" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdById" INTEGER,
    CONSTRAINT "Productos_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Productos_code_key" ON "Productos"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Productos_code_category_key" ON "Productos"("code", "category");
