import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';

describe('TaskService', () => {
    let service: TaskService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TaskService]
        });
        service = TestBed.inject(TaskService);

        // Use the new reset method for perfect isolation
        service.resetState();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should add a task and update the signal', () => {
        service.addTask('Test Task');
        expect(service.tasks().length).toBe(1);
        expect(service.tasks()[0].title).toBe('Test Task');
    });

    it('should toggle task completion status', () => {
        service.addTask('Toggle Me');
        const taskId = service.tasks()[0].id;
        service.toggleTask(taskId);
        expect(service.tasks()[0].completed).toBe(true);
    });

    it('should delete a task and remove it from the signal array', () => {
        service.addTask('Task to be Deleted');
        const taskId = service.tasks()[0].id;

        // Verify it was added
        expect(service.tasks().length).toBe(1);

        // Perform deletion
        service.deleteTask(taskId);

        // Verify it is gone
        expect(service.tasks().length).toBe(0);
    });
});