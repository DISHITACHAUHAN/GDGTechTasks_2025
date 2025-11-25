package com.groovegallery.repository;

import com.groovegallery.model.Rating;
import com.groovegallery.model.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    Optional<Rating> findByVideoAndSessionId(Video video, String sessionId);
    List<Rating> findByVideo(Video video);
}
