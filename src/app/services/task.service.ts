import { Injectable, signal } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
    private readonly STORAGE_KEY = 'internship_pro_tasks';

    // Use a signal to hold the task list
    private tasksSignal = signal<Task[]>(this.loadFromStorage());
    tasks = this.tasksSignal.asReadonly();

    private loadFromStorage(): Task[] {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }

    // ADD THIS METHOD: It allows tests to reset the state
    // In a real app, this is also useful for "Logout" or "Clear Data"
    resetState() {
        localStorage.removeItem(this.STORAGE_KEY);
        this.tasksSignal.set([]);
    }

    addTask(title: string) {
        const newTask: Task = { id: Date.now(), title, completed: false };
        this.tasksSignal.update(tasks => [...tasks, newTask]);
        this.sync();
    }

    deleteTask(id: number) {
        this.tasksSignal.update(tasks => tasks.filter(t => t.id !== id));
        this.sync();
    }

    toggleTask(id: number) {
        this.tasksSignal.update(tasks =>
            tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
        );
        this.sync();
    }

    private sync() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tasksSignal()));
    }
}