import { nanoid } from "nanoid";
import { db } from "..";
import { contributors } from "../schemas/contributors";
import { ContributorsRepository } from "./interfaces/contributors";

export const contributorsRepository: ContributorsRepository = {
  insertContributor: async (data) => {
    const [newContributor] = await db
      .insert(contributors)
      .values(data)
      .returning();
    return newContributor;
  },
};
