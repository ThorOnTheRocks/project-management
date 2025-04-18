export interface Task {
    id: string,
    name: string,
    status: TaskStatus,
}

export type TaskStatus = "open" | "in-progress" | "done";