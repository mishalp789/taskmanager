package com.taskmanager.pro.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.taskmanager.pro.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long>{
    List<Task> findByTitleContainingIgnoreCase(String title);
}
