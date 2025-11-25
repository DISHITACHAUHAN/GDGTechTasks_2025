package com.groovegallery.controller;

import com.groovegallery.dto.VideoResponse;
import com.groovegallery.model.User;
import com.groovegallery.model.Video;
import com.groovegallery.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "${cors.allowed-origins}")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getUserProfile(@AuthenticationPrincipal User user) {
        try {
            User profile = userService.getUserProfile(user.getId());
            
            Map<String, Object> response = new HashMap<>();
            response.put("id", profile.getId());
            response.put("username", profile.getUsername());
            response.put("email", profile.getEmail());
            response.put("registeredAt", profile.getRegisteredAt());
            
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/me")
    public ResponseEntity<?> updateUserProfile(
            @AuthenticationPrincipal User user,
            @RequestBody Map<String, String> request) {
        try {
            String username = request.get("username");
            User updatedUser = userService.updateUserProfile(user.getId(), username);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "MISSION COMPLETE: Profile updated");
            response.put("username", updatedUser.getUsername());
            
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/me/videos")
    public ResponseEntity<List<VideoResponse>> getUserVideos(@AuthenticationPrincipal User user) {
        List<Video> videos = userService.getUserVideos(user);
        List<VideoResponse> responses = videos.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    private VideoResponse convertToResponse(Video video) {
        VideoResponse response = new VideoResponse();
        response.setId(video.getId());
        response.setFilename(video.getFilename());
        response.setOriginalFilename(video.getOriginalFilename());
        response.setUploadedAt(video.getUploadedAt());
        
        if (video.getUploader() != null) {
            response.setUploaderUsername(video.getUploader().getUsername());
            response.setUploaderId(video.getUploader().getId());
        } else {
            response.setUploaderUsername("Unknown");
            response.setUploaderId(null);
        }
        
        response.setAverageRating(video.getAverageRating());
        response.setTotalRatings(video.getTotalRatings());
        response.setStreamUrl("/api/videos/" + video.getId() + "/stream");
        return response;
    }
}
