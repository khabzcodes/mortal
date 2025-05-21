import { member, user } from "@/lib/db/schemas/auth-schema";

export type UserSelect = typeof user.$inferSelect;
export type MemberSelect = typeof member.$inferSelect;
export type MemberWithUser = {
  member: MemberSelect;
  user: Pick<UserSelect, "id" | "email" | "name" | "image">;
};
