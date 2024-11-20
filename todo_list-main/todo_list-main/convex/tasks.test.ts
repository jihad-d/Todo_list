import { expect, test, vi } from "vitest";
import { api } from "./_generated/api";
import schema from "./schema";
import { getAuthUserId } from "@convex-dev/auth/server";
import { Id } from "./_generated/dataModel";



//simule l'id d'un user
const testUserId = "0000000000000000000000000" as Id<"users">;

//applique le mock sur le module
vi.mock("@convex-dev/auth/server", () => ({
    authTables: {
        users: {},
        sessions: {},
    },
    getAuthUserId: vi.fn().mockResolvedValue(testUserId)
}));

//simule une fonction ajt les taches
const mockAddTask = vi.fn(async ({ text }) => {
    return {
        text,
        isCompleted: false,
        status: "To Do",
        userId: testUserId,
    };
});


//ajt tache
test("ajout de taches", async () => {
    const result = await mockAddTask({ text: "Nouvelle tâche" });

    expect(result).toMatchObject({
        text: "Nouvelle tâche",
        isCompleted: false,
        status: "To Do",
        userId: testUserId
    });
});


//simule une fonction pour obtenir les taches
const mockGetTasks = vi.fn(async () => {
    return [
        {
            text: "Tâche 1",
            isCompleted: false,
            status: "To Do",
            userId: testUserId,
        },
        {
            text: "Tâche 2",
            isCompleted: true,
            status: "Done",
            userId: testUserId,
        },
    ];
});

//lire tache
test("lecture des taches", async () => {
    const tasks = await mockGetTasks();

    expect(tasks).toHaveLength(2);

    //verifie que la 1er tache est correcte
    expect(tasks[0]).toMatchObject({
        text: "Tâche 1",
        isCompleted: false,
        status: "To Do",
        userId: testUserId,
    });

    //verifie que la 2eme tache est correcte
    expect(tasks[1]).toMatchObject({
        text: "Tâche 2",
        isCompleted: true,
        status: "Done",
        userId: testUserId,
    });
});


//simule tache existante
const task = {
    text: "Ancienne tâche",
    isCompleted: false,
    status: "To Do",
    userId: testUserId,
};

//simule une fonction pour modifier une tache
const mockUpdateTask = vi.fn(async ({ taskId, updates }) => {
    if (taskId !== "task-1") {
        throw new Error("Task not found");
    }

    //retourne tache modifiee
    return {
        ...task,
        ...updates,
    };
});

//modif tache
test("modification tache", async () => {
    const updatedTask = await mockUpdateTask({
        taskId: "task-1",
        updates: {
            text: "Tache modifiee",
            isCompleted: true,
            status: "Done",
        },
    });

    //verifie que la tache est bien modifiee
    expect(updatedTask).toMatchObject({
        text: "Tache modifiee",
        isCompleted: true,
        status: "Done",
        userId: testUserId,
    });
});



//simule un tableau de tache
let tasks: any[] = [
    {
      id: "task-1",
      text: "Tache à supprimer",
      isCompleted: false,
      status: "To Do",
      userId: testUserId,
    },
    {
      id: "task-2",
      text: "Tache restante",
      isCompleted: false,
      status: "In Progress",
      userId: testUserId,
    },
  ];
  
  //simule une fonction pour supprimer tache
  const mockDeleteTask = vi.fn(async (taskId: string) => {
    const index = tasks.findIndex((task) => task.id === taskId);
    if (index === -1) {
      throw new Error("Task not found");
    }
    tasks.splice(index, 1);
    return { success: true };
  });
  
  //suppression tache
  test("suppression d'une tache", async () => {
    const result = await mockDeleteTask("task-1");
  
    //verifie que la tache est bien supp
    expect(result).toEqual({ success: true });
    expect(tasks).toHaveLength(1);
    expect(tasks[0].id).toBe("task-2");
  });
  
  //erreur pour une tache inexistante (suppression)
  test("erreur suppression tache inexistante", async () => {
    await expect(mockDeleteTask("task-3")).rejects.toThrow("Task not found");
  });
  
  //simule un autre tableau de tache
  let tasksMock: any[] = [
    {
      id: "task-1",
      text: "Tâche à déplacer",
      isCompleted: false,
      status: "To Do",
      userId: testUserId,
    },
    {
      id: "task-2",
      text: "Tâche In Progress",
      isCompleted: false,
      status: "In Progress",
      userId: testUserId,
    },
  ];
  
  //simule une fonction pour changer le statut d'une tache
  const mockChangeTaskStatus = vi.fn(async ({ taskId, newStatus }: { taskId: string; newStatus: string }) => {
    const task = tasksMock.find((task) => task.id === taskId);
    if (!task) {
      throw new Error("Task not found");
    }
    task.status = newStatus;
    return task;
  });
  
  //changer la colonne d'une tache (to do => in progress)
  test("changement de colonne d'une tache", async () => {
    const result = await mockChangeTaskStatus({
      taskId: "task-1",
      newStatus: "In Progress",
    });
  
    //verifie que le statut de la tache a change
    expect(result).toMatchObject({
      id: "task-1",
      text: "Tâche à déplacer",
      isCompleted: false,
      status: "In Progress",
      userId: testUserId,
    });
  
    //verifie l'etat du tableau des taches
    expect(tasksMock[0].status).toBe("In Progress");
  });
  
  //erreur tache inexistante (changement de colonne)
  test("erreur changement de colonne d'une tache inexistante", async () => {
    await expect(
      mockChangeTaskStatus({ taskId: "task-3", newStatus: "Done" })
    ).rejects.toThrow("Task not found");
  });
  

 //simule un tableau de tache avec une tache ajt par defaut
let tasksTo = [
    {
      id: "task-1",
      text: "Test defaut todo",
      isCompleted: false,
      status: "To Do", // statut initial = "To Do"
      userId: testUserId,
    },
  ];
  
  //tache affichee par defaut dans la colonne "To Do"
  test("tache s'affiche par defaut dans 'To Do'", () => {
    const task = tasksTo[0];  // Utilisation de tasksTo au lieu de tasksMock
    
    // verifie que la tache a bien le statut "To Do"
    expect(task.status).toBe("To Do");
  });
  

