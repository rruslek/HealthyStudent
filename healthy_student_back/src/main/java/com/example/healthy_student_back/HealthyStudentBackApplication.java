package com.example.healthy_student_back;

import com.example.healthy_student_back.dto.RegisterRequest;
import com.example.healthy_student_back.service.AuthService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import static com.example.healthy_student_back.dto.Role.ADMIN;
import static com.example.healthy_student_back.dto.Role.MANAGER;

@SpringBootApplication
public class HealthyStudentBackApplication {

    public static void main(String[] args) {
        SpringApplication.run(HealthyStudentBackApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(
            AuthService service
    ) {
        return args -> {
            var admin = RegisterRequest.builder()
                    .firstname("Admina")
                    .lastname("Admina")
                    .email("admin@mail.com")
                    .password("password123")
                    .role(ADMIN)
                    .build();
            System.out.println("Admin token: " + service.register(admin).getAccessToken());

            var manager = RegisterRequest.builder()
                    .firstname("Admin")
                    .lastname("Admin")
                    .email("manager@mail.com")
                    .password("password")
                    .role(MANAGER)
                    .build();
            System.out.println("Manager token: " + service.register(manager).getAccessToken());

        };
    }

}
