package com.groovegallery.controller;

import com.groovegallery.model.Rating;
import com.groovegallery.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/ratings")
@CrossOrigin(origins = "${cors.allowed-origins}")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    @PostMapping("/video/{videoId}")
    public ResponseEntity<?> rateVideo(
            @PathVariable Long videoId,
            @RequestBody Map<String, Object> request) {
        try {
            Integer stars = (Integer) request.get("stars");
            String sessionId = (String) request.get("sessionId");

            if (stars == null || sessionId == null) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "FUNK-O-METER ERROR: Stars and sessionId are required");
                return ResponseEntity.badRequest().body(error);
            }

            Rating rating = ratingService.rateVideo(videoId, stars, sessionId);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "FUNK-O-METER ACTIVATED: Rating recorded");
            response.put("stars", rating.getStars());
            response.put("averageRating", ratingService.getVideoRating(videoId));
            response.put("totalRatings", ratingService.getTotalRatings(videoId));

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/video/{videoId}")
    public ResponseEntity<Map<String, Object>> getVideoRating(@PathVariable Long videoId) {
        try {
            Double averageRating = ratingService.getVideoRating(videoId);
            Integer totalRatings = ratingService.getTotalRatings(videoId);

            Map<String, Object> response = new HashMap<>();
            response.put("averageRating", averageRating);
            response.put("totalRatings", totalRatings);

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
