package com.example.healthy_student_back.service;

import com.example.healthy_student_back.dto.AuthRequest;
import com.example.healthy_student_back.dto.User;
import com.example.healthy_student_back.repo.UsersRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsersService {
    @Autowired
    private UsersRepository usersRepo;

}
