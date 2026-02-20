import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  // Ensure these match your actual filenames exactly
  templateUrl: './task-list.html', // Matches 'task-list.html' from your ls
  styleUrl: './task-list.css'
})
export class TaskListComponent implements OnInit {
  newTaskTitle = '';
  tasks = signal<any[]>([]);

  constructor(public taskService: TaskService) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((data: any) => {
      this.tasks.set(data);
    });
  }

  onAdd() {
    if (this.newTaskTitle.trim()) {
      this.taskService.addTask(this.newTaskTitle).subscribe({
        next: () => {
          this.newTaskTitle = '';
          this.loadTasks(); // This refreshes the list from MongoDB
        },
        error: (err) => console.error('Add failed:', err)
      });
    }
  }

  // ADD THESE: Fixes "Property does not exist" errors
  onDelete(id: string) {
    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }

  onToggle(task: any) {
    this.taskService.toggleTask(task._id, task.completed).subscribe(() => this.loadTasks());
  }
}