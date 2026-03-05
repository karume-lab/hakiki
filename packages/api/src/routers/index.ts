import { pubOS } from "@repo/api/os";
import { adminRouter } from "@repo/api/routers/admin";
import { politicianRouter } from "@repo/api/routers/politician";

export const router = pubOS.router({
  admin: adminRouter,
  politician: politicianRouter,
});
