import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth'; // Ensure this path is correct

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskListComponent implements OnInit {
  newTaskTitle = '';
  tasks = signal<any[]>([]);

  constructor(
    public taskService: TaskService,
    private authService: AuthService // Injected to handle logout
  ) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (data: any) => {
        this.tasks.set(data);
      },
      error: (err) => console.error('Failed to load tasks:', err)
    });
  }

  onAdd() {
    if (this.newTaskTitle.trim()) {
      this.taskService.addTask(this.newTaskTitle).subscribe({
        next: () => {
          this.newTaskTitle = '';
          this.loadTasks();
        },
        error: (err) => console.error('Add failed:', err)
      });
    }
  }

  onDelete(id: string) {
    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }

  onToggle(task: any) {
    // Toggles the completion status in the database
    this.taskService.toggleTask(task._id, task.completed).subscribe(() => this.loadTasks());
  }

  onLogout() {
    this.authService.logout(); // Clears token and redirects
  }
}