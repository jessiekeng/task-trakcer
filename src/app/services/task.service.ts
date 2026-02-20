import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TaskService {
    private apiUrl = 'http://localhost:5001/api/tasks';

    constructor(private http: HttpClient) { }

    // Helper method to attach your security token
    private getHeaders() {
        const token = localStorage.getItem('token'); // Ensure this matches the key in login.ts
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }

    getTasks() {
        return this.http.get(this.apiUrl, { headers: this.getHeaders() });
    }

    addTask(title: string) {
        return this.http.post(this.apiUrl, { title }, { headers: this.getHeaders() });
    }

    deleteTask(id: string) {
        return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
    }

    toggleTask(id: string, completed: boolean) {
        return this.http.put(`${this.apiUrl}/${id}`, { completed }, { headers: this.getHeaders() });
    }
}