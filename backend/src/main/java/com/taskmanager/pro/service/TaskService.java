package com.taskmanager.pro.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.taskmanager.pro.model.Task;
import com.taskmanager.pro.model.User;
import com.taskmanager.pro.repository.TaskRepository;
import com.taskmanager.pro.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public Task createTask(Task task){
        return taskRepository.save(task);
    }

    public List<Task> getAllTasks(){
        return taskRepository.findAll();
    }
    
    public Optional<Task> getTaskById(Long id){
        return taskRepository.findById(id);
    }
    public Task updateTask(Task task){
        return taskRepository.save(task);
    }
    public void deleteTask(Long id){
        taskRepository.deleteById(id);
    }
    public List<Task> searchTasksByTitle(String title){
        return taskRepository.findByTitleContainingIgnoreCase(title);
    }
    public boolean isOwner(Long taskId, String email) {
    Task task = taskRepository.findById(taskId)
            .orElseThrow(() -> new RuntimeException("Task not found: " + taskId));
    return task.getUser().getEmail().equals(email);
}
    public Optional<User> getUserByEmail(String email){
    return userRepository.findByEmail(email);
}

}
