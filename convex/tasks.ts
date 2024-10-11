import { mutation, query } from "./_generated/server";
import { ConvexError, Infer, v } from "convex/values";

export type Goal = {
  _id: string;
  _creationTime: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  completedAt?: string;
  lastUpdatedAt?: string;
  startDate?: string;
  dueDate?: string;
  projectId: string;
};

export type Task = {
  _id: string;
  title: string;
  issueKey: string;
  description: string;
  priority: string;
  category: string;
  complexity: "Simple" | "Medium" | "Complex";
  status: string;
  daysEstimation?: number;
  completedAt?: string;
  goalId: string;
  projectId: string;
  lastUpdatedAt?: string;
};

export type TaskWithGoal = Task & {
  goal: Goal | null;
};

export const taskObject = v.object({
  title: v.string(),
  issueKey: v.string(),
  description: v.string(),
  priority: v.string(),
  category: v.string(),
  complexity: v.union(
    v.literal("Simple"),
    v.literal("Medium"),
    v.literal("Complex")
  ),
  status: v.string(),
  daysEstimation: v.optional(v.number()),
  goalId: v.id("goals"),
  projectId: v.id("projects"),
  completedAt: v.optional(v.string()),
  lastUpdatedAt: v.optional(v.string()),
});

export const taskObjectToUpdate = v.object({
  title: v.optional(v.string()),
  issueKey: v.optional(v.string()),
  description: v.optional(v.string()),
  priority: v.optional(v.string()),
  category: v.optional(v.string()),
  complexity: v.optional(
    v.union(v.literal("Simple"), v.literal("Medium"), v.literal("Complex"))
  ),
  status: v.optional(v.string()),
  daysEstimation: v.optional(v.number()),
  goalId: v.id("goals"),
  projectId: v.id("projects"),
  completedAt: v.optional(v.string()),
  lastUpdatedAt: v.optional(v.string()),
});

export type TaskObject = Infer<typeof taskObject>;

export const getTasksWithGoals = query({
  args: { projectId: v.id("projects") },
  async handler(ctx, args) {
    // Fetch all tasks for the given project

    const { projectId } = args;
    if (!projectId) {
      throw new ConvexError("No ProjectId provided, cannot query tasks.");
    }

    try {
      const tasks = await ctx.db
        .query("tasks")
        .filter((q) => q.eq(q.field("projectId"), args.projectId))
        .collect();
      const tasksWithGoals: TaskWithGoal[] = await Promise.all(
        tasks.map(async (task) => {
          const goal = await ctx.db.get(task.goalId); // Fetch the goal by goalId
          return { ...task, goal }; // Combine task and goal data
        })
      );

      return tasksWithGoals;
    } catch (error) {
      console.error("Error occured: ", error);
      throw new ConvexError("Failed to fetch tasks");
    }
  },
});

export const getTasksWithGoalsByTaskStatus = query({
  args: { projectId: v.id("projects"), status: v.string() },
  async handler(ctx, args) {
    const { projectId, status } = args;

    if (!projectId) {
      throw new ConvexError("No projectId provided, unable to fetch tasks");
    }

    if (!status) {
      throw new ConvexError("Need status value to fetch tasks");
    }

    try {
      const tasks = await ctx.db
        .query("tasks")
        .filter((q) =>
          q.and(
            q.eq(q.field("projectId"), args.projectId),
            q.eq(q.field("status"), args.status)
          )
        )
        .collect();

      // Fetch the associated goal for each task
      const tasksWithGoals: TaskWithGoal[] = await Promise.all(
        tasks.map(async (task) => {
          const goal = await ctx.db.get(task.goalId); // Fetch the goal by goalId
          return { ...task, goal }; // Combine task and goal data
        })
      );

      return tasksWithGoals;
    } catch (error) {
      console.error("An error occured: ", error);
      throw new ConvexError("Failed to fetch tasks");
    }
    // Fetch all tasks for the given project
  },
});

export const createTask = mutation({
  args: taskObject,
  async handler(ctx, args) {
    if (!taskObject) {
      throw new ConvexError("No value object passed to create a task");
    }

    try {
      await ctx.db.insert("tasks", {
        title: args.title,
        issueKey: args.issueKey,
        description: args.description,
        status: args.status,
        priority: args.priority,
        category: args.category,
        complexity: args.complexity,
        daysEstimation: args.daysEstimation,
        goalId: args.goalId,
        lastUpdatedAt: args.lastUpdatedAt,
        projectId: args.projectId,
      });
    } catch (error) {
      console.error("An error occured: ", error);
      throw new ConvexError("Failed to create new task");
    }
  },
});

export const getTaskById = query({
  args: { taskId: v.id("tasks") },
  async handler(ctx, args) {
    const { taskId } = args;

    if (!taskId) {
      throw new ConvexError(
        "No taskId provided or Invalid Id. Unable to get task"
      );
    }

    try {
      console.info("Task by id fetched successfully");
      const taskById = await ctx.db
        .query("tasks")
        .filter((q) => q.eq(q.field("_id"), args.taskId))
        .collect();
      console.log({
        message: "Successfully fetched task",
        success: true,
        task: taskById,
      });
    } catch (error) {
      console.error("An error occured : ", error);
      throw new ConvexError("Failed to get task by projectId");
    }
  },
});

export const updateTaskById = mutation({
  args: { taskId: v.id("tasks"), taskObjectToUpdate: taskObjectToUpdate },
  async handler(ctx, args) {
    const { taskId, taskObjectToUpdate } = args;
    if (!taskId) {
      throw new ConvexError(
        "No Id or Invalid Id provided. Unable to update task."
      );
    }

    if (!taskObjectToUpdate) {
      throw new ConvexError(
        "No object values provided for update. unable to update"
      );
    }

    try {
      const updatedData = Object.fromEntries(
        Object.entries(taskObjectToUpdate).filter(
          ([, values]) => values !== undefined
        )
      );
      console.log({
        message: "Successfully updated task",
        success: true,
        task: updatedData,
      });
      return await ctx.db.patch(taskId, updatedData);
    } catch (error) {
      console.error("An error occurred: ", error);
      throw new ConvexError("Failed to update task");
    }
  },
});

export const deleteTaskById = mutation({
  args: { taskId: v.id("tasks") },
  async handler(ctx, args) {
    const { taskId } = args;
    if (!taskId) {
      throw new ConvexError(
        "No Id or Invalid Id Provided. Unable to delete task"
      );
    }

    try {
      console.info({
        message: "Sucessfully deleted task",
        sucessful: true,
      });
      return await ctx.db.delete(args.taskId);
    } catch (error) {
      console.error("An error occured: ", error);
      throw new ConvexError("Failed to delete task");
    }
  },
});
