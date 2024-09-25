"use client"

import { useQuery } from "convex/react";
import { CreateGoalButton } from "./create-goal-form";
import { api } from "@/convex/_generated/api";
import { GoalCard } from "./goalCard";

export default function Home() {
  const goals = useQuery(api.goals.getGoals);
  return (
    <main className="p-24 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">My Goals</h1>
        <CreateGoalButton />
      </div>

      <div className="grid grid-cols-4 gap-8">
        {goals?.map((goal) => <GoalCard key={goal._id} goal={goal} />)}
      </div>
    </main>
  );
}
