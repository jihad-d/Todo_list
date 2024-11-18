import { mutation, query } from "./_generated/server"; //fonction pour interagir avec la bd
import { v } from "convex/values"; // obj qui fournit fonctions pour definir et valider les types de donnes ex ; string, id ...
import { getAuthUserId } from "@convex-dev/auth/server"; //fonction qui recup l'id s'assure que le user est bien connecte 
import { Doc, Id } from "./_generated/dataModel";


type TaskStatus = "To Do" | "In Progress" | "Done"; //limite les status de la tache


//recup les taches du user connecte
export const getUserTasks = query({
  args: { userId: v.id("users") }, //attend l'argument : id 
  handler: async (ctx, { userId }) => { //fonction qui execute la logique 
    return await ctx.db //interroge la bd pour recupere les info de la table tasks 
      .query("tasks")
      .filter((q) => q.eq(q.field("userId"), userId)) //filtre les taches en fonction de l'id  
      .collect();
  },
});


//ajt tache
export const addTask = mutation({ 
  args: { text: v.string() },
  handler: async (ctx, { text }) => {
    const userId = await getAuthUserId(ctx); //recup l'id du user connecte 
    if (!userId) throw new Error("Not signed in"); //si user pas connecte alors erreur 
    const newTask = { //obj (=tache) a ajt dans la bd 
      text,
      isCompleted: false,
      status: "To Do" as TaskStatus,
      userId,
    };
    await ctx.db.insert("tasks", newTask); //insert nvl tache dans la table 
  },
});


//lire tableau
export const getAllTasks = query({
    handler: async (ctx) => { 
      return await ctx.db 
        .query("tasks")
        .collect(); 
    },
});


//maj status tache
export const updateTaskStatus = mutation({
  args: {
    taskId: v.id("tasks"),
    status: v.union(
      v.literal("To Do"),
      v.literal("In Progress"),
      v.literal("Done")
    ),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not signed in");

    const task = await ctx.db.get(args.taskId); //recup la tache a l'aide de son id 
    if (!task || task.userId !== userId) { // si la tache existe pas ou le user qu change le status n'est pas le bon user alors erreur 
      throw new Error("Not authorized to update this task");
    }

    await ctx.db.patch(args.taskId, { status: args.status }); //maj dans la bd 
  },
});


//supp tache
export const deleteTask = mutation({ //mutation : operation qui modifie l'etat 
  args: { taskId: v.id("tasks") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not signed in");

    const task = await ctx.db.get(args.taskId);
    if (!task || task.userId !== userId) {
      throw new Error("Not authorized to delete this task");
    }
    await ctx.db.delete(args.taskId);
  },
});


