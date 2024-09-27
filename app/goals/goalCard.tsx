import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Doc } from "@/convex/_generated/dataModel";

export function GoalCard({ goal }: { goal: Doc<"goals"> }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{goal.title}</CardTitle>
        <CardDescription>{goal.status}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{goal.description}</p>
        <p>{goal.priority}</p>
      </CardContent>
      <CardFooter>
        <Button>View</Button>
      </CardFooter>
    </Card>
  );
}
