-- CreateTable
CREATE TABLE "klepton" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "stitle" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2500) NOT NULL,
    "pic" VARCHAR(255) NOT NULL,
    "owner_only" BOOLEAN NOT NULL,
    "member_only" BOOLEAN NOT NULL,
    "member_count" INTEGER NOT NULL,
    "post_count" INTEGER NOT NULL,
    "owner_id" INTEGER NOT NULL,

    CONSTRAINT "klepton_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" VARCHAR(8000) NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "author_id" INTEGER NOT NULL,
    "klepton_id" INTEGER NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reply" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "content" VARCHAR(8000) NOT NULL,
    "author_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,
    "reacts" VARCHAR(255)[],

    CONSTRAINT "reply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "dname" VARCHAR(255),
    "name" VARCHAR(255),
    "hidename" BOOLEAN DEFAULT false,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_KleptonMembers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_KleptonMembers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "klepton_owner_id_idx" ON "klepton"("owner_id");

-- CreateIndex
CREATE INDEX "post_author_id_klepton_id_idx" ON "post"("author_id", "klepton_id");

-- CreateIndex
CREATE INDEX "reply_author_id_post_id_idx" ON "reply"("author_id", "post_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "user_email_idx" ON "user"("email");

-- CreateIndex
CREATE INDEX "_KleptonMembers_B_index" ON "_KleptonMembers"("B");

-- AddForeignKey
ALTER TABLE "klepton" ADD CONSTRAINT "klepton_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_klepton_id_fkey" FOREIGN KEY ("klepton_id") REFERENCES "klepton"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reply" ADD CONSTRAINT "reply_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reply" ADD CONSTRAINT "reply_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KleptonMembers" ADD CONSTRAINT "_KleptonMembers_A_fkey" FOREIGN KEY ("A") REFERENCES "klepton"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KleptonMembers" ADD CONSTRAINT "_KleptonMembers_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
