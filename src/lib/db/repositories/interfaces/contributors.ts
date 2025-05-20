import { InsertContributor, SelectContributor } from "@/types/contributors";

export type ContributorsRepository = {
  insertContributor(
    data: Omit<InsertContributor, "id" | "createdAt">
  ): Promise<InsertContributor>;
};
