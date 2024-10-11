import { mutation, query } from "./_generated/server";
import { ConvexError, Infer, v } from "convex/values";

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
    const { projectId } = args;
    if (!projectId) {
      throw new ConvexError("No projectId provided. Unable to query goals");
    }

    try {
      const goals = await ctx.db
        .query("goals")
        .filter((q) => q.eq(q.field("projectId"), args.projectId))
        .collect();
      console.info("Goals successfully fetched.");
      return goals;
    } catch (error) {
      console.error("Unable to fetch goals due to error: ", error);
      throw new ConvexError("Failed to fetch goals");
    }
  },
});

export const createGoal = mutation({
  args: goalObject,
  async handler(ctx, args) {
    if (!args) {
      throw new ConvexError(
        "No value object sent. Unable to create new record."
      );
    }
    try {
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
    } catch (error) {
      console.error("Unable to insert data due to error: ", error);
      throw new ConvexError("Failed attempt to insert record in goals table");
    }
  },
});

export const updateGoalById = mutation({
  args: { goalId: v.id("goals"), goalObjectToUpdate: goalObjectToUpdate },
  async handler(ctx, args) {
    const { goalId, goalObjectToUpdate } = args;
    if (!goalId) {
      throw new ConvexError("No goalId provided. Update is not possible");
    }

    if (!goalObjectToUpdate) {
      throw new ConvexError(
        "No values send to update goal. Update is not possible"
      );
    }

    try {
      const updateData = Object.fromEntries(
        Object.entries(goalObjectToUpdate).filter(
          ([, value]) => value !== undefined
        )
      );
      await ctx.db.patch(args.goalId, updateData);
      console.log({
        success: true,
        message: "Goal has been updated successfully.",
      });
    } catch (error) {
      console.error("Error has occured during update: ", error);
      throw new ConvexError("Update has been cancelled due to error. ");
    }
  },
});

export const deleteGoalById = mutation({
  args: { id: v.id("goals") },
  handler: async (ctx, args) => {
    if (!args.id) {
      throw new ConvexError("No Id has been provided");
    }

    try {
      const tasksAssociatedWithGoal = await ctx.db
        .query("tasks")
        .filter((q) => q.eq(q.field("goalId"), args.id))
        .collect();

      if (tasksAssociatedWithGoal.length > 0) {
        await Promise.all(
          tasksAssociatedWithGoal.map((task) => ctx.db.delete(task._id))
        );
        console.info(
          `${tasksAssociatedWithGoal.length} tasks associated with goal successfully deleted.`
        );
      }

      // Always delete the goal after deleting tasks
      await ctx.db.delete(args.id);
      console.info("Goal successfully deleted.");

      return {
        success: true,
        message: "Goal and associated tasks deleted successfully.",
      };
    } catch (error) {
      console.error("Error during deletion:", error);
      throw new ConvexError("Failed to delete goal or associated tasks.");
    }
  },
});
