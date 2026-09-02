-- CreateTable
CREATE TABLE "SiteSecret" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSecret_pkey" PRIMARY KEY ("key")
);
