package com.groovegallery.service;

import com.groovegallery.model.Rating;
import com.groovegallery.model.Video;
import com.groovegallery.repository.RatingRepository;
import com.groovegallery.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private VideoRepository videoRepository;

    @Transactional
    public Rating rateVideo(Long videoId, Integer stars, String sessionId) {
        if (stars < 1 || stars > 5) {
            throw new RuntimeException("FUNK-O-METER ERROR: Rating must be between 1 and 5 stars");
        }

        Video video = videoRepository.findById(videoId)
                .orElseThrow(() -> new RuntimeException("TRANSMISSION ERROR: Video not found"));

        Optional<Rating> existingRating = ratingRepository.findByVideoAndSessionId(video, sessionId);
        if (existingRating.isPresent()) {
            throw new RuntimeException("FUNK-O-METER ERROR: You have already rated this groove");
        }

        Rating rating = new Rating();
        rating.setVideo(video);
        rating.setSessionId(sessionId);
        rating.setStars(stars);
        rating.setRatedAt(LocalDateTime.now());

        Rating savedRating = ratingRepository.save(rating);

        updateAverageRating(videoId);

        return savedRating;
    }

    @Transactional
    public void updateAverageRating(Long videoId) {
        Video video = videoRepository.findById(videoId)
                .orElseThrow(() -> new RuntimeException("TRANSMISSION ERROR: Video not found"));

        List<Rating> ratings = ratingRepository.findByVideo(video);

        if (ratings.isEmpty()) {
            video.setAverageRating(0.0);
            video.setTotalRatings(0);
        } else {
            double average = ratings.stream()
                    .mapToInt(Rating::getStars)
                    .average()
                    .orElse(0.0);
            
            video.setAverageRating(Math.round(average * 100.0) / 100.0);
            video.setTotalRatings(ratings.size());
        }

        videoRepository.save(video);
    }

    public Double getVideoRating(Long videoId) {
        Video video = videoRepository.findById(videoId)
                .orElseThrow(() -> new RuntimeException("TRANSMISSION ERROR: Video not found"));
        return video.getAverageRating();
    }

    public Integer getTotalRatings(Long videoId) {
        Video video = videoRepository.findById(videoId)
                .orElseThrow(() -> new RuntimeException("TRANSMISSION ERROR: Video not found"));
        return video.getTotalRatings();
    }
}
