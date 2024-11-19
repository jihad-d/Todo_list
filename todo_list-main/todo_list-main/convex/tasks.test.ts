import { convexTest } from "convex-test";
import { expect, test } from "vitest";
import { api } from "./_generated/api";
import schema, { updateTask } from "./schema";


// test("authenticated functions", async () => {
//   const t = convexTest(schema);

//   // Utilisateur authentifié : Sarah
//   const asSarah = t.withIdentity({ name: "Sarah", email: "sarah@example.com" });
//   await asSarah.mutation(api.tasks.create, { text: "Task for Sarah" });

//   // Sarah devrait voir sa tâche
//   const sarahsTasks = await asSarah.query(api.tasks.list);
//   expect(sarahsTasks).toMatchObject([{ text: "Task for Sarah" }]);

//   // Un autre utilisateur : Lee
//   const asLee = t.withIdentity({ name: "Lee", email: "lee@example.com" });
//   const leesTasks = await asLee.query(api.tasks.list);

//   // Lee ne devrait pas voir les tâches de Sarah
//   expect(leesTasks).toEqual([]);

//   // Tentative de mise à jour d'une tâche par un utilisateur non autorisé
//   const taskToUpdate = sarahsTasks[0];
//   await expect(
//     asLee.mutation(api.tasks.update, { taskId: taskToUpdate._id, text: "Unauthorized update" })
//   ).rejects.toThrow("Not authorized to update this task");
// });
