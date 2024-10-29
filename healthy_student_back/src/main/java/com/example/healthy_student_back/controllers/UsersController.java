package com.example.healthy_student_back.controllers;
import com.example.healthy_student_back.dto.User;
import com.example.healthy_student_back.repo.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(
        origins="http://localhost:3000/",
        allowCredentials = "true"
)
public class UsersController {
    @Autowired
    private UsersRepository usersRepo;

    @GetMapping("/users")
    ResponseEntity<Iterable<User>> getUsers() {
        Iterable<User> users = usersRepo.findAll();

        return new ResponseEntity<>(users, HttpStatus.OK);
    }
}