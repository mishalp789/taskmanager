package com.taskmanager.pro.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.taskmanager.pro.model.Task;
import com.taskmanager.pro.model.User;
import com.taskmanager.pro.service.TaskService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;


@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@Tag(name = "Tasks", description = "Task Management APIs")
public class TaskController {
    private final TaskService taskService;

    // CREATE TASK
    @PostMapping
    @Operation(summary = "Create a new task")
    public ResponseEntity<Task> createTask(@RequestBody Task task, Authentication authentication) {
        String email = authentication.getName(); // <-- FIXED
        User user = taskService.getUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        task.setUser(user);
        return ResponseEntity.ok(taskService.createTask(task));
    }


    // GET ALL TASKS
    @GetMapping
    @Operation(summary = "Get all tasks")
    public ResponseEntity<List<Task>> getAllTasks(){
        return ResponseEntity.ok(taskService.getAllTasks());
    }

    // GET TASK BY ID
    @GetMapping("/{id}")
    @Operation(summary = "Get a task by ID")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id){
        return taskService.getTaskById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // UPDATE TASK (OWNER or ADMIN only)
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @taskService.isOwner(#id, authentication.name)")
    @Operation(summary = "Update a task by ID (Admin or Owner only)")
    public ResponseEntity<Task> updateTask(@PathVariable Long id,
                                        @RequestBody Task updatedTask,
                                        Authentication authentication) {
        return taskService.getTaskById(id)
                .map(task -> {
                    updatedTask.setId(task.getId());
                    updatedTask.setUser(task.getUser()); // preserve owner
                    return ResponseEntity.ok(taskService.updateTask(updatedTask));
                })
                .orElse(ResponseEntity.notFound().build());
    }


    // DELETE TASK (OWNER or ADMIN only)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @taskService.isOwner(#id, authentication.name)")
    @Operation(summary = "Delete a task by ID (Admin or Owner only)")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }

    // SEARCH TASKS BY TITLE
    @GetMapping("/search")
    @Operation(summary = "Search tasks by title")
    public ResponseEntity<List<Task>> searchTasks(@RequestParam String title) {
        return ResponseEntity.ok(taskService.searchTasksByTitle(title));
    }
}


