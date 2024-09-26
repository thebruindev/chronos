import { mutation, query } from "./_generated/server";
import { Infer, v } from "convex/values";

export const projectObject = v.object({
  title: v.string(),
  description: v.string(),
  lastUpdatedAt: v.optional(v.string()),
});

export type ProjectObject = Infer<typeof projectObject>;

export const getProjects = query({
  async handler(ctx) {
    return await ctx.db.query("projects").collect();
  },
});

export const getProjectById = query({
    args: { projectId: v.id("projects")},
    async handler(ctx, args) {
      return await ctx.db.get(args.projectId)
    },
  });

export const createProject = mutation({
  args: projectObject,
  async handler(ctx, args) {
    await ctx.db.insert("projects", {
      title: args.title,
      description: args.description,
      lastUpdatedAt: args.lastUpdatedAt,
    });
  },
});
