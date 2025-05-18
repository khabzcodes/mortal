import { actions } from "@/lib/db/schemas/note-activities";
import { NoteActivityInsert } from "@/types/activity";

export const getActivityDescription = (
  type: (typeof actions.enumValues)[number]
) => {
  switch (type) {
    case "CREATE":
      return "Created";
    case "UPDATE":
      return "Edited";
    case "DELETE":
      return "Deleted ";
    case "PINNED":
      return "Pinned";
    case "UNPINNED":
      return "Unpinned note";
    case "ADD_TO_FAVORITES":
      return "Added to favorites";
    case "REMOVE_FROM_FAVORITES":
      return "Removed from favorites";
    default:
      return type;
  }
};

export const groupActivitiesByDate = (activities: NoteActivityInsert[]) => {
  const grouped: Record<string, NoteActivityInsert[]> = {};

  activities.forEach((activity) => {
    const date = new Date(activity.createdAt).toDateString();
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(activity);
  });

  return grouped;
};
