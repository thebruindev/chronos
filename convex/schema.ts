import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  goals: defineTable({
    title: v.string(),
    description: v.string(),
    status: v.string(),
    priority: v.string(),
    startDate: v.optional(v.string()),
    dueDate: v.optional(v.string()),
    completedAt: v.optional(v.string()),
    lastUpdatedAt: v.optional(v.string()),
  }),
  tasks: defineTable({
    title: v.string(),
    description: v.string(),
    priority: v.string(),
    category: v.string(),
    complexity: v.union(
      v.literal("simple"),
      v.literal("medium"),
      v.literal("complex")
    ),
    status: v.string(),
    daysEstimation: v.number(),
    goalId: v.id("goals"),
    lastUpdatedAt: v.optional(v.string()),
  }),
});
