package com.alumniconnect.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.*;
import java.util.Objects;

@Service
public class FileStorageService {

    private final Path fileStorageLocation;

    public FileStorageService(@Value("${file.upload-dir:uploads/resumes}") String uploadDir) {
        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Could not create the directory where uploaded files will be stored.", ex);
        }
    }

    public String storeFile(MultipartFile file, Long userId) {
        String originalFilename = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        
        if (originalFilename.contains("..")) {
            throw new IllegalArgumentException("Filename contains invalid path sequence " + originalFilename);
        }

        // Validate File Type (PDF, DOC, DOCX)
        String extension = "";
        int i = originalFilename.lastIndexOf('.');
        if (i > 0) {
            extension = originalFilename.substring(i + 1).toLowerCase();
        }

        if (!extension.equals("pdf") && !extension.equals("doc") && !extension.equals("docx")) {
            throw new IllegalArgumentException("Only PDF, DOC, and DOCX resume files are permitted.");
        }

        String targetFileName = "resume_user_" + userId + "_" + System.currentTimeMillis() + "." + extension;

        try {
            Path targetLocation = this.fileStorageLocation.resolve(targetFileName);
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, targetLocation, StandardCopyOption.REPLACE_EXISTING);
            }
            return "/api/files/download/" + targetFileName;
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file " + targetFileName + ". Please try again!", ex);
        }
    }

    public Path loadFile(String fileName) {
        return this.fileStorageLocation.resolve(fileName).normalize();
    }
}
