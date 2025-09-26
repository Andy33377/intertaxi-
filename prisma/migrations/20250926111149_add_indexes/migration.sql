-- CreateIndex
CREATE INDEX "idx_order_createdAt" ON "public"."Order"("createdAt");

-- CreateIndex
CREATE INDEX "idx_order_date_time" ON "public"."Order"("date", "time");
