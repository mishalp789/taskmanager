package com.example.taskmanager.service;

import com.example.taskmanager.model.Task;
import java.util.List;
import java.util.Optional;

public interface TaskService {

    // Create a new task
    Task createTask(Task task);

    // Get all tasks
    List<Task> getAllTasks();

    // Get a task by its ID
    Optional<Task> getTaskById(String id);

    // Update a task by its ID
    Task updateTask(String id, Task taskDetails);

    // Delete a task by its ID
    void deleteTask(String id);
}
