import Link from "next/link";
import { JSONContent } from "@tiptap/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Clock, MoreHorizontal, Star, Tag } from "lucide-react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate } from "@/lib/utils";
import { ContributorWithUser } from "@/types/contributors";
import { Icons } from "../icons";
import { AvatarCircles } from "../ui/avatar-circles";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

dayjs.extend(relativeTime);

type NoteCardProps = {
  note: {
    id: string;
    title: string;
    description: string;
    content: string | null;
    tags: string[];
    contributors: ContributorWithUser[];
    createdAt: Date;
    updatedAt: Date | null;
  };
};

export const NoteCard = ({
  note: { id, title, description, content, tags, contributors, createdAt, updatedAt },
}: NoteCardProps) => {
  const jsonContent: JSONContent = content ? JSON.parse(content) : null;

  const completedTaskCount = completeTask(jsonContent);
  const totalTaskCount = countTasks(jsonContent);

  return (
    <Card className="shadow-lg bg-card/50 backdrop-blur-sm rounded-none border border-dashed">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-lg font-bold">{title}</CardTitle>
          <CardDescription className="line-clamp-2 mt-1">{description.substring(0, 100)}</CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/editor/${id}`} className="w-full">
                Go to editor
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Pin note</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              <Tag className="mr-1 h-3 w-3" />
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t border-dashed p-4 text-xs text-muted-foreground max-h-5">
        <div className="flex items-center">
          <Clock className="mr-1 h-3 w-3" />
          <span>{updatedAt ? dayjs().to(dayjs(updatedAt)) : dayjs().to(dayjs(createdAt))}</span>
        </div>
        <div className="flex items-center gap-2">
          {totalTaskCount > 0 && (
            <div className="flex items-center">
              <Icons.taskDone className="size-4 mr-1" />
              <span className="text-xs mr-1">
                {completedTaskCount}/{totalTaskCount}
              </span>
              <span className="text-xs">Tasks</span>
            </div>
          )}
          {contributors.length > 0 && (
            <div className="flex items-center">
              <AvatarCircles
                users={contributors.map((contributor) => ({
                  name: contributor.user.name,
                  image: contributor.user.image || undefined,
                }))}
              />
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

const countTasks = (node: JSONContent): number => {
  if (!node) return 0;

  let count = 0;

  // Count if current node is a taskItem
  if (node.type === "taskItem") {
    count += 1;
  }

  // Recurse into children
  if (Array.isArray(node.content)) {
    for (const child of node.content) {
      count += countTasks(child);
    }
  }

  return count;
};

const completeTask = (node: JSONContent): number => {
  if (!node) return 0;

  let count = 0;

  // Count if current node is a taskItem
  if (node.type === "taskItem" && node?.attrs?.checked) {
    count += 1;
  }

  // Recurse into children
  if (Array.isArray(node.content)) {
    for (const child of node.content) {
      count += completeTask(child);
    }
  }

  return count;
};
