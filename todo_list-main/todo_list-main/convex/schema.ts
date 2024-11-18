// import { defineSchema, defineTable } from "convex/server";
// import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

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


import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  tasks: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
    status: v.union(v.literal("To Do"), v.literal("In Progress"), v.literal("Done")),
    userId: v.id("users"),
  }),
  // messages:defineTable({
  //   body: v.string(),
  //   userId: v.id("users"),
  // }),
  // users: defineTable({
  //   name: v.string(),
  //   email: v.string(),
  //   emailVerificationTime: v.number(),  
  //   image: v.string(), 
  // }),
});

