import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
    private apiUrl = 'http://localhost:5001/api/tasks';

    private tasksSignal = signal<Task[]>([]);
    tasks = this.tasksSignal.asReadonly();

    constructor(private http: HttpClient) { }

    private getHeaders() {
        const token = localStorage.getItem('task_token');
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }

    // FIX: Added missing getTasks method
    getTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(this.apiUrl, { headers: this.getHeaders() }).pipe(
            tap(tasks => this.tasksSignal.set(tasks))
        );
    }

    // FIX: Returns Observable so .subscribe() works
    addTask(title: string): Observable<Task> {
        return this.http.post<Task>(this.apiUrl, { title }, { headers: this.getHeaders() });
    }

    deleteTask(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
    }

    toggleTask(id: string, completed: boolean): Observable<Task> {
        return this.http.put<Task>(`${this.apiUrl}/${id}`, { completed: !completed }, { headers: this.getHeaders() });
    }
}