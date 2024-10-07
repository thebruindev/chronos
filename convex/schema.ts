import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    title: v.string(),
    description: v.string(),
    lastUpdatedAt: v.optional(v.string()),
    tokenIdentifier: v.string()
  }).index('by_tokenIdentifier', ['tokenIdentifier']),
  goals: defineTable({
    title: v.string(),
    description: v.string(),
    status: v.string(),
    priority: v.string(),
    startDate: v.optional(v.string()),
    dueDate: v.optional(v.string()),
    completedAt: v.optional(v.string()),
    projectId: v.id("projects"),
    lastUpdatedAt: v.optional(v.string()),
  }),
  tasks: defineTable({
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
    completedAt: v.optional(v.string()),
    goalId: v.id("goals"),
    projectId: v.id("projects"),
    lastUpdatedAt: v.optional(v.string()),
  }),
  backlogs: defineTable({
    projectId: v.id("projects"),
    taskId: v.id("tasks"),
    addedAt: v.string()
  }),
  sprints: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    startDate: v.string(),
    endDate: v.string(),
    status: v.union(
      v.literal("Planned"),
      v.literal("Active"),
      v.literal("Completed")
    ),
    projectId: v.id("projects"), // Association with a project
    createdAt: v.string(), // Sprint creation timestamp
    lastUpdatedAt: v.optional(v.string()) // For tracking updates
  }).index('by_projectId', ['projectId']), // Index to retrieve sprints by project
  
  sprintTasks: defineTable({ // Association table between sprints and tasks
    sprintId: v.id("sprints"),
    taskId: v.id("tasks"),
    assignedAt: v.string(), 
  })
});
