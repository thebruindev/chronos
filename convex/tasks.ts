import { mutation, query } from "./_generated/server";
import { Infer, v } from "convex/values";

export const taskObject = v.object({
    title: v.string(),
    description: v.string(),
    priority: v.string(),
    category: v.string(),
    complexity: v.union(
        v.literal("simple"),
        v.literal("medium"),
        v.literal("complex"),
      ),
    status: v.string(),
    daysEstimation: v.number(),
    goalId: v.id("goals"),
    lastUpdatedAt: v.string()
});

export type TaskObject = Infer<typeof taskObject>

export const getTasks = query({
  async handler(ctx) {
    return await ctx.db.query("tasks").collect();
  },
});

export const createTask = mutation({
  args: taskObject,
  async handler(ctx, args) {
    
    await ctx.db.insert("tasks", {
        title: args.title,
        description: args.description,
        status: args.status,
        priority: args.priority,
        category: args.category,
        complexity: args.complexity,
        daysEstimation: args.daysEstimation,
        goalId: args.goalId,
        lastUpdatedAt: args.lastUpdatedAt
    });
  },
});
