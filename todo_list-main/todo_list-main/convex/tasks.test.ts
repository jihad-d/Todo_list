import { convexTest } from "convex-test";
import { expect, test } from "vitest";
import { api } from "./_generated/api";
import schema from "./schema";

// test("add task", async () => {
//   const t = convexTest(schema);

//   const userId: Id<"users"> = "some-valid-user-id";  
//   // Ajouter une tâche pour cet utilisateur
//   const taskText = "Test Task";
//   await t.mutation(api.tasks.addTask, { text: taskText });

//   // Récupérer les tâches de l'utilisateur
//   const tasks = await t.query(api.tasks.getUserTasks, { userId });

//   // Vérifier que la tâche ajoutée correspond aux attentes
//   expect(tasks).toContainEqual(
//     expect.objectContaining({
//       text: taskText,
//       isCompleted: false,
//       status: "To Do",
//       userId,
//     })
//   );
// });