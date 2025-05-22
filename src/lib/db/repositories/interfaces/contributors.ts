import { InsertContributor } from "@/types/contributors";

export type ContributorsRepository = {
  insertContributor(data: InsertContributor): Promise<InsertContributor>;
};
