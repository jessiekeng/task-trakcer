import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.html', // Fixed: matches your folder
  styleUrl: './task-list.css'      // Fixed: matches your folder
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
      this.taskService.addTask(this.newTaskTitle).subscribe(() => {
        this.newTaskTitle = '';
        this.loadTasks();
      });
    }
  }
}