package com.groovegallery.service;

import com.groovegallery.model.User;
import com.groovegallery.model.Video;
import com.groovegallery.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VideoService videoService;

    public User getUserProfile(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("TRANSMISSION ERROR: Agent not found"));
    }

    public User updateUserProfile(Long userId, String username) {
        User user = getUserProfile(userId);

        if (username != null && !username.equals(user.getUsername())) {
            if (userRepository.existsByUsername(username)) {
                throw new RuntimeException("MISSION FAILED: Agent codename already taken");
            }
            user.setUsername(username);
        }

        return userRepository.save(user);
    }

    public List<Video> getUserVideos(User user) {
        return videoService.getVideosByUser(user);
    }
}
