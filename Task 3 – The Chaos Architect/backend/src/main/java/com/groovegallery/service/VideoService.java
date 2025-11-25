package com.groovegallery.service;

import com.groovegallery.model.User;
import com.groovegallery.model.Video;
import com.groovegallery.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class VideoService {

    @Autowired
    private VideoRepository videoRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    private static final List<String> ALLOWED_VIDEO_TYPES = Arrays.asList(
        "video/mp4", "video/quicktime", "video/x-msvideo", "video/webm"
    );

    private static final long MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

    public Video uploadVideo(MultipartFile file, User uploader) throws IOException {
        validateVideoFile(file);

        String originalFilename = file.getOriginalFilename();
        String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String uniqueFilename = UUID.randomUUID().toString() + fileExtension;

        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Path filePath = uploadPath.resolve(uniqueFilename);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        Video video = new Video();
        video.setFilename(uniqueFilename);
        video.setOriginalFilename(originalFilename);
        video.setFilePath(filePath.toString());
        video.setFileSize(file.getSize());
        video.setMimeType(file.getContentType());
        video.setUploadedAt(LocalDateTime.now());
        video.setUploader(uploader);
        video.setAverageRating(0.0);
        video.setTotalRatings(0);

        Video savedVideo = videoRepository.save(video);
        System.out.println("Video saved successfully with ID: " + savedVideo.getId());
        return savedVideo;
    }

    private void validateVideoFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new RuntimeException("MISSION FAILED: No file selected");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new RuntimeException("MISSION FAILED: File size exceeds 100MB limit");
        }

        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_VIDEO_TYPES.contains(contentType)) {
            throw new RuntimeException("MISSION FAILED: Invalid file type. Only video files allowed (mp4, mov, avi, webm)");
        }
    }

    public List<Video> getAllVideos() {
        return videoRepository.findAllByOrderByUploadedAtDesc();
    }

    public List<Video> getVideosByUser(User user) {
        return videoRepository.findByUploaderOrderByUploadedAtDesc(user);
    }

    public Video getVideoById(Long id) {
        return videoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("TRANSMISSION ERROR: Video not found"));
    }

    public Resource getVideoFile(Long id) throws IOException {
        Video video = getVideoById(id);
        Path filePath = Paths.get(video.getFilePath());
        Resource resource = new UrlResource(filePath.toUri());

        if (resource.exists() && resource.isReadable()) {
            return resource;
        } else {
            throw new RuntimeException("TRANSMISSION ERROR: Video file not found or not readable");
        }
    }

    public void deleteVideo(Long id, User user) throws IOException {
        Video video = getVideoById(id);

        if (!video.getUploader().getId().equals(user.getId())) {
            throw new RuntimeException("ACCESS DENIED: You can only delete your own videos");
        }

        Path filePath = Paths.get(video.getFilePath());
        Files.deleteIfExists(filePath);

        videoRepository.delete(video);
    }
}
