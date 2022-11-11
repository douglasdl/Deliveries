-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_deliviries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "item_name" TEXT NOT NULL,
    "id_client" TEXT NOT NULL,
    "id_deliveryman" TEXT,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "deliviries_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "deliviries_id_deliveryman_fkey" FOREIGN KEY ("id_deliveryman") REFERENCES "deliverman" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_deliviries" ("create_at", "end_at", "id", "id_client", "id_deliveryman", "item_name") SELECT "create_at", "end_at", "id", "id_client", "id_deliveryman", "item_name" FROM "deliviries";
DROP TABLE "deliviries";
ALTER TABLE "new_deliviries" RENAME TO "deliviries";
CREATE UNIQUE INDEX "deliviries_item_name_key" ON "deliviries"("item_name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
