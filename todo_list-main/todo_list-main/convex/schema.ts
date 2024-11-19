// import { defineSchema, defineTable } from "convex/server";
// import { v } from "convex/values";
// // The schema is normally optional, but Convex Auth
// // requires indexes defined on `authTables`.
// // The schema provides more precise TypeScript types.
// export default defineSchema({
//   ...authTables,
//   messages: defineTable({
//     userId: v.id("users"),
//     body: v.string(),
//   }),
// });

import { authTables, getAuthUserId } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { mutation } from "./_generated/server";

export default defineSchema({
  ...authTables,
  tasks: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
    status: v.union(v.literal("To Do"), v.literal("In Progress"), v.literal("Done")),
    userId: v.id("users"),
  }),
});


export const updateTask = mutation({
  args: {
    taskId: v.id("tasks"),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not signed in");

    const task = await ctx.db.get(args.taskId);
    if (!task || task.userId !== userId) {
      throw new Error("Not authorized to update this task");
    }

    await ctx.db.patch(args.taskId, { text: args.text });
  },
});

