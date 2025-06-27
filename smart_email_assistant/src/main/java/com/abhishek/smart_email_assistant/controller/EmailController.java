package com.abhishek.smart_email_assistant.controller;


import com.abhishek.smart_email_assistant.DTO.EmailRequest;
import com.abhishek.smart_email_assistant.service.EmailService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@CrossOrigin(origins = "*")
public class EmailController {
    @Autowired
    private EmailService service;

    @PostMapping("/generate")
    public ResponseEntity<String> emailResponse(@RequestBody EmailRequest request){
        String response = service.generateEmailResponse(request);
        return ResponseEntity.ok(response);
    }
}
