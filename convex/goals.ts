import { mutation, query } from "./_generated/server";
import { Infer, v } from "convex/values";

export const goalObject = v.object({
  title: v.string(),
  description: v.string(),
  status: v.string(),
  priority: v.string(),
  startDate: v.optional(v.string()),
  dueDate: v.optional(v.string()),
  completedAt: v.optional(v.string()),
  lastUpdatedAt: v.optional(v.string()),
  projectId: v.id("projects"),
});

export type GoalObject = Infer<typeof goalObject>;

export const getGoalsByProjectId = query({
  args: { projectId: v.id("projects") },
  async handler(ctx, args) {
    return await ctx.db
      .query("goals")
      .filter((q) => q.eq(q.field("projectId"), args.projectId))
      .collect();
  },
});

export const createGoal = mutation({
  args: goalObject,
  async handler(ctx, args) {
    await ctx.db.insert("goals", {
      title: args.title,
      description: args.description,
      status: args.status,
      priority: args.priority,
      startDate: args.startDate,
      dueDate: args.dueDate,
      completedAt: args.completedAt,
      lastUpdatedAt: args.lastUpdatedAt,
      projectId: args.projectId,
    });
  },
});
