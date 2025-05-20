import { nanoid } from "nanoid";
import { db } from "..";
import { contributions } from "../schemas/contributors";
import { ContributorsRepository } from "./interfaces/contributors";

export const contributorsRepository: ContributorsRepository = {
  insertContributor: async (data) => {
    const [newContributor] = await db
      .insert(contributions)
      .values({
        id: nanoid(12),
        ...data,
      })
      .returning();
    return newContributor;
  },
};
