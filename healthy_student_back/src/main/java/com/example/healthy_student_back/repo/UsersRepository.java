package com.example.healthy_student_back.repo;

import com.example.healthy_student_back.dto.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UsersRepository extends JpaRepository<User, Integer> {
    List<User> findAll();
    Optional<User> findByLogin(String login);

    Optional<User> findByEmail(String email);
}