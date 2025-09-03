package com.example.taskmanager.repository;

import com.example.taskmanager.model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends MongoRepository<Task, String> {
    
    // You can add custom query methods here if needed
    // Example: find tasks by title
    Task findByTitle(String title);
}
