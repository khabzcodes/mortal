import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Link, Calendar, Star, Tag } from "lucide-react";
import { Button } from "../ui/button";
import { formatDate } from "@/lib/utils";
import { Badge } from "../ui/badge";

type NoteCardProps = {
  note: {
    id: string;
    title: string;
    description: string;
    isFavorite: boolean;
    tags: string[];
    createdAt: Date;
    updatedAt: Date | null;
  };
};

export const NoteCard = ({
  note: { id, title, description, isFavorite, tags, createdAt, updatedAt },
}: NoteCardProps) => {
  return (
    <Card className="shadow-lg bg-card/50 backdrop-blur-sm rounded-none border border-dashed max-w-96">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-lg font-bold">{title}</CardTitle>
          <CardDescription className="line-clamp-2 mt-1">
            {description.substring(0, 100)}
          </CardDescription>
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
              <Link href={`/notes/${id}`}>Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              {isFavorite ? "Remove from favorites" : "Add to favorites"}
            </DropdownMenuItem>
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
          <Calendar className="mr-1 h-3 w-3" />
          <span>{formatDate(updatedAt || createdAt || "")}</span>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Star
            className={`h-4 w-4 ${
              isFavorite ? "fill-yellow-400 text-yellow-400" : ""
            }`}
          />
          <span className="sr-only">
            {isFavorite ? "Remove from favorites" : "Add to favorites"}
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
};
