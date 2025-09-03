package com.example.taskmanager.controller;

import com.example.taskmanager.model.Task;
import com.example.taskmanager.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks") // Base URL for all task APIs
@CrossOrigin(origins = "http://localhost:5173") // Allow React frontend (Vite) to call
public class TaskController {

    private final TaskService taskService;

    // Constructor injection
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // -------------------------
    // Create Task
    // POST /api/tasks
    // -------------------------
    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        Task createdTask = taskService.createTask(task);
        return ResponseEntity.ok(createdTask);
    }

    // -------------------------
    // Get All Tasks
    // GET /api/tasks
    // -------------------------
    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> tasks = taskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }

    // -------------------------
    // Get Task By ID
    // GET /api/tasks/{id}
    // -------------------------
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable String id) {
        Task task = taskService.getTaskById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id " + id));
        return ResponseEntity.ok(task);
    }

    // -------------------------
    // Update Task
    // PUT /api/tasks/{id}
    // -------------------------
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable String id, @RequestBody Task taskDetails) {
        Task updatedTask = taskService.updateTask(id, taskDetails);
        return ResponseEntity.ok(updatedTask);
    }

    // -------------------------
    // Delete Task
    // DELETE /api/tasks/{id}
    // -------------------------
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable String id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok("Task deleted successfully");
    }
}
