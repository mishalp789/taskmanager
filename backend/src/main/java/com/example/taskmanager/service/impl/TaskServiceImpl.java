package com.example.taskmanager.service.impl;

import com.example.taskmanager.model.Task;
import com.example.taskmanager.repository.TaskRepository;
import com.example.taskmanager.service.TaskService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    // Constructor injection (recommended over @Autowired)
    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public Task createTask(Task task) {
        // Saves the task to MongoDB
        return taskRepository.save(task);
    }

    @Override
    public List<Task> getAllTasks() {
        // Fetch all tasks from MongoDB
        return taskRepository.findAll();
    }

    @Override
    public Optional<Task> getTaskById(String id) {
        // Find task by ID
        return taskRepository.findById(id);
    }

    @Override
    public Task updateTask(String id, Task taskDetails) {
        // First, fetch the existing task
        return taskRepository.findById(id)
                .map(task -> {
                    task.setTitle(taskDetails.getTitle());
                    task.setDescription(taskDetails.getDescription());
                    task.setCompleted(taskDetails.isCompleted());
                    // Save updated task
                    return taskRepository.save(task);
                })
                .orElseThrow(() -> new RuntimeException("Task not found with id " + id));
    }

    @Override
    public void deleteTask(String id) {
        // Delete task by ID
        taskRepository.deleteById(id);
    }
}
