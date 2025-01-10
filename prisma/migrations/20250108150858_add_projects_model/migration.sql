-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "links" TEXT[],

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
