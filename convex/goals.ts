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

export const goalObjectToUpdate = v.object({
  title: v.optional(v.string()),
  description: v.optional(v.string()),
  status: v.optional(v.string()),
  priority: v.optional(v.string()),
  startDate: v.optional(v.string()),
  dueDate: v.optional(v.string()),
  completedAt: v.optional(v.string()),
  lastUpdatedAt: v.optional(v.string()),
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

export const updateGoalById = mutation({
  args: { goalId: v.id("goals"), goalObjectToUpdate: goalObjectToUpdate },
  async handler(ctx, args) {
    const { goalObjectToUpdate } = args;

    // Dynamically filter out undefined values
    const updateData = Object.fromEntries(
      Object.entries(goalObjectToUpdate).filter(
        ([, value]) => value !== undefined
      )
    );

    // Patch the document with the filtered data
    return await ctx.db.patch(args.goalId, updateData);
  },
});

export const deleteGoalById = mutation({
  args: { id: v.id("goals") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// export const deleteGoalById = internalMutation({
//   args: { id: v.id("goals") },
//   handler: (ctx, args) => ctx.db.delete(args.id),
// });
