package com.abhishek.smart_email_assistant.service;

import com.abhishek.smart_email_assistant.DTO.EmailRequest;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class EmailService {

    private final WebClient webClient;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;
    @Value("${gemini.api.key}")
    private String geminiApiKey;

    @Autowired
    public EmailService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    public String generateEmailResponse(EmailRequest request){
        //build the prompt which will go to gemini
        String prompt = BuildPrompt(request);

        //craft the request refer the postman content->part->text
        Map<String ,Object> requestBody =Map.of("contents",new Object[]{
                Map.of("parts", new Object[]{
                        Map.of("text",prompt)
                })
        });

        //do request get response
        String response = webClient.post()
                .uri(geminiApiUrl+geminiApiKey)
                .header("Content-Type","application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();
        System.out.println("Gemini raw response:\n" + response);
        //return extract response because we will get in the form of content->part->text
        return extractResponse(response);
    }

    private String extractResponse(String response) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode node = mapper.readTree(response);
            return node.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();
        }catch (Exception e){
            return "error message"+e.getMessage();
        }
    }

    private String BuildPrompt(EmailRequest request) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("generate a email response for this content.please dont generate subject line");
        if(request.getTone()!=null && !request.getTone().isEmpty()){
            prompt.append(" use a ").append(request.getTone()).append("tone");
        }
        prompt.append("\n Original email :\n").append(request.getEmailContent());
        return prompt.toString();
    }
}
