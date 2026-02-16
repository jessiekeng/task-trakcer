import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from './task.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  newTaskTitle: string = '';
  tasks: Task[] = [];

  // Lifecycle hook: Loads data when the component is first initialized
  ngOnInit() {
    const savedData = localStorage.getItem('intern_tasks');
    if (savedData) {
      this.tasks = JSON.parse(savedData);
    }
  }

  addTask() {
    if (this.newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now(),
        title: this.newTaskTitle.trim(),
        completed: false
      };
      this.tasks.push(newTask);
      this.syncStorage();
      this.newTaskTitle = '';
    }
  }

  toggleTask(task: Task) {
    task.completed = !task.completed;
    this.syncStorage();
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.syncStorage();
  }

  // Utility method to keep LocalStorage in sync
  private syncStorage() {
    localStorage.setItem('intern_tasks', JSON.stringify(this.tasks));
  }
}