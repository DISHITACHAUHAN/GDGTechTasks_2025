package com.groovegallery.repository;

import com.groovegallery.model.Video;
import com.groovegallery.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {
    List<Video> findByUploaderOrderByUploadedAtDesc(User uploader);
    List<Video> findAllByOrderByUploadedAtDesc();
}
