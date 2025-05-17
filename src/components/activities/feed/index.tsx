"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserActivitySummary } from "@/rpc/activities";
import { QueryKeys } from "@/rpc/query-keys";
import { useQuery } from "@tanstack/react-query";
import {
  getActivityDescription,
  groupActivitiesByDate,
} from "@/components/activities/utils";
import { Icons } from "@/components/icons";

const activityIcons = {
  CREATE: () => <Icons.fileAdd className="h-3.5 w-3.5" />,
  UPDATE: () => <Icons.fileEdit className="h-3.5 w-3.5" />,
  DELETE: () => <Icons.fileRemove className="h-3.5 w-3.5" />,
  PINNED: () => <div>Pinned</div>,
  UNPINNED: () => <div>Unpinned</div>,
  ADD_TO_FAVORITES: () => <div>Add to favorites</div>,
  REMOVE_FROM_FAVORITES: () => <div>Remove from favorites</div>,
} as const;

export const ActivityFeed = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [QueryKeys.GET_USER_ACTIVITY_SUMMARY],
    queryFn: () => getUserActivitySummary(),
  });

  const groupedActivities = data
    ? groupActivitiesByDate(
        data.map((activity) => ({
          ...activity,
          createdAt: new Date(activity.createdAt),
          note: {
            ...activity.note,
            createdAt: new Date(activity.note.createdAt),
            updatedAt: activity.note.updatedAt
              ? new Date(activity.note.updatedAt)
              : null,
          },
        }))
      )
    : {};

  return (
    <Card className="shadow-lg bg-card/50 backdrop-blur-sm rounded-none border border-dashed">
      <CardHeader className="border-b border-dashed">
        <CardTitle>Activity</CardTitle>
      </CardHeader>
      <div className="space-y-8">
        {isLoading && (
          <div className="px-4 space-y-2">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        )}
        {error && (
          <div className="text-red-500 text-center">Error: {error.message}</div>
        )}
        {Object.entries(groupedActivities).length === 0 && !isLoading ? (
          <div className="text-center text-muted-foreground">
            No activities found
          </div>
        ) : (
          Object.entries(groupedActivities).map(([date, activities]) => (
            <div key={date} className="px-6">
              <div className="sticky top-0 z-10 mb-2 pb-1 text-sm font-medium">
                {new Date(date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <div className="relative space-y-4">
                {activities.map((activity) => {
                  const ActivityIcon = activityIcons[activity.action];

                  return (
                    <div
                      key={activity.id}
                      className="relative flex items-center gap-4"
                    >
                      <div className="relative mt-1 flex h-7 w-7 flex-none items-center justify-center rounded-full border border-dashed bg-background">
                        <ActivityIcon />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <p className="font-medium">
                            {getActivityDescription(activity.action)}
                            <span className="ml-1 font-normal text-muted-foreground">
                              {activity.note.title}
                            </span>
                          </p>
                          <time className="text-xs text-muted-foreground">
                            {new Date(activity.createdAt).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              }
                            )}
                          </time>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
