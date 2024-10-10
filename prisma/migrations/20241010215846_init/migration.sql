-- CreateTable
CREATE TABLE "PersonaNatural" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "identifier" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT,
    "createdById" INTEGER,
    CONSTRAINT "PersonaNatural_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PersonaJuridica" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "companyName" TEXT NOT NULL,
    "ruc" TEXT NOT NULL,
    "representativeName" TEXT NOT NULL,
    "representativePosition" TEXT,
    "companyEmail" TEXT NOT NULL,
    "companyPhone" TEXT NOT NULL,
    "companyAddress" TEXT,
    "companyType" TEXT NOT NULL,
    "createdById" INTEGER,
    CONSTRAINT "PersonaJuridica_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PersonaNatural_identifier_key" ON "PersonaNatural"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "PersonaNatural_email_key" ON "PersonaNatural"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PersonaNatural_identifier_email_key" ON "PersonaNatural"("identifier", "email");

-- CreateIndex
CREATE UNIQUE INDEX "PersonaJuridica_ruc_key" ON "PersonaJuridica"("ruc");

-- CreateIndex
CREATE UNIQUE INDEX "PersonaJuridica_companyEmail_key" ON "PersonaJuridica"("companyEmail");

-- CreateIndex
CREATE UNIQUE INDEX "PersonaJuridica_ruc_companyEmail_key" ON "PersonaJuridica"("ruc", "companyEmail");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
