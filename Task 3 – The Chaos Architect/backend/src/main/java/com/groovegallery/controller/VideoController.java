package com.groovegallery.controller;

import com.groovegallery.dto.VideoResponse;
import com.groovegallery.model.User;
import com.groovegallery.model.Video;
import com.groovegallery.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/videos")
@CrossOrigin(origins = "${cors.allowed-origins}")
public class VideoController {

    @Autowired
    private VideoService videoService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadVideo(
            @RequestParam("file") MultipartFile file,
            @AuthenticationPrincipal User user) {
        try {
            Video video = videoService.uploadVideo(file, user);
            VideoResponse response = convertToResponse(video);
            
            Map<String, Object> result = new HashMap<>();
            result.put("message", "MISSION COMPLETE: Groove transmitted successfully");
            result.put("video", response);
            
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        } catch (IOException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "TRANSMISSION ERROR: Failed to upload video");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @GetMapping
    public ResponseEntity<List<VideoResponse>> getAllVideos() {
        List<Video> videos = videoService.getAllVideos();
        List<VideoResponse> responses = videos.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VideoResponse> getVideo(@PathVariable Long id) {
        try {
            Video video = videoService.getVideoById(id);
            return ResponseEntity.ok(convertToResponse(video));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/stream")
    public ResponseEntity<Resource> streamVideo(@PathVariable Long id) {
        try {
            Video video = videoService.getVideoById(id);
            Resource resource = videoService.getVideoFile(id);

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(video.getMimeType()))
                    .header(HttpHeaders.CONTENT_DISPOSITION, 
                            "inline; filename=\"" + video.getOriginalFilename() + "\"")
                    .body(resource);
        } catch (RuntimeException | IOException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVideo(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        try {
            videoService.deleteVideo(id, user);
            Map<String, String> response = new HashMap<>();
            response.put("message", "MISSION COMPLETE: Video deleted");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
        } catch (IOException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "TRANSMISSION ERROR: Failed to delete video");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
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
