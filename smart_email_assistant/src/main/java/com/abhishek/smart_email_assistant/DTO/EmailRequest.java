package com.abhishek.smart_email_assistant.DTO;

import lombok.Data;

@Data
public class EmailRequest {
    private String emailContent;
    private String tone;
}
