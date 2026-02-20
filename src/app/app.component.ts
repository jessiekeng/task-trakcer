import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from './services/task.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    // Use 'inject' - the modern way to handle Dependency Injection
    taskService = inject(TaskService);
    newTaskTitle = '';

    // Get the tasks signal from the service
    tasks = this.taskService.tasks;

    onAdd() {
        if (this.newTaskTitle.trim()) {
            this.taskService.addTask(this.newTaskTitle);
            this.newTaskTitle = '';
        }
    }
}