package in.ayush.ghbliapi.service;

import in.ayush.ghbliapi.client.StabilityAIClient;
import in.ayush.ghbliapi.dto.StabilityAIResponse;
import in.ayush.ghbliapi.dto.TextToImageRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Base64;

@Service
public class GhibliArtService {

    private static final Logger log = LoggerFactory.getLogger(GhibliArtService.class);

    private final StabilityAIClient stabilityAIClient;
    private final String apiKey;

    public GhibliArtService(StabilityAIClient stabilityAIClient,
                            @Value("${stability.api.key}") String apiKey) {
        this.stabilityAIClient = stabilityAIClient;
        this.apiKey = apiKey;
        log.info("GhibliArtService started; stability api key present: {}",
                (this.apiKey != null && !this.apiKey.isBlank()));
    }

    public byte[] createGhibliArt(MultipartFile image, String prompt) {
        String engineId = "stable-diffusion-xl-1024-v1-0";
        String stylePreset = "anime";
        double imageStrength = 0.35;
        double weight = 1.0;

        try {
            // Validate and resize image to valid dimensions
            MultipartFile validatedImage = validateAndResizeImage(image);

            StabilityAIResponse resp = stabilityAIClient.generateImageFromImage(
                    "Bearer " + apiKey,
                    engineId,
                    validatedImage,
                    prompt + ", in the beautiful, detailed anime style of Studio Ghibli.",
                    weight,
                    stylePreset,
                    imageStrength
            );

            return extractImageBytes(resp);

        } catch (Exception e) {
            log.error("Image-to-image generation failed", e);
            throw new RuntimeException("Image-to-image generation failed: " + e.getMessage(), e);
        }
    }

    public byte[] createGhibliArtFromText(String prompt, String style) {
        String engineId = "stable-diffusion-xl-1024-v1-0";
        String stylePreset = style.equalsIgnoreCase("general") ? "anime" : style.replace("_", "-");

        TextToImageRequest requestPayload = new TextToImageRequest(
                prompt + ", in the beautiful, detailed anime style of Studio Ghibli.",
                stylePreset
        );

        try {
            StabilityAIResponse resp = stabilityAIClient.generateImageFromText(
                    "Bearer " + apiKey,
                    engineId,
                    requestPayload
            );

            return extractImageBytes(resp);

        } catch (Exception e) {
            log.error("Text-to-image generation failed", e);
            throw new RuntimeException("Text-to-image generation failed: " + e.getMessage(), e);
        }
    }

    private byte[] extractImageBytes(StabilityAIResponse resp) {
        if (resp == null || resp.getArtifacts() == null || resp.getArtifacts().isEmpty()) {
            throw new RuntimeException("Invalid response from Stability AI - no artifacts found");
        }

        String b64 = resp.getArtifacts().get(0).getBase64();
        if (b64 == null || b64.isBlank()) {
            throw new RuntimeException("Stability AI artifact missing base64 image data");
        }

        try {
            return Base64.getDecoder().decode(b64);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Failed to decode base64 image", e);
        }
    }

    private MultipartFile validateAndResizeImage(MultipartFile originalImage) throws IOException {
        BufferedImage originalBufferedImage = ImageIO.read(new ByteArrayInputStream(originalImage.getBytes()));

        // Check if image needs resizing (must be one of the allowed SDXL dimensions)
        int originalWidth = originalBufferedImage.getWidth();
        int originalHeight = originalBufferedImage.getHeight();

        // Allowed dimensions for SDXL v1.0
        int[][] allowedDimensions = {
                {1024, 1024}, {1152, 896}, {1216, 832}, {1344, 768}, {1536, 640},
                {640, 1536}, {768, 1344}, {832, 1216}, {896, 1152}
        };

        // Check if current dimensions are allowed
        boolean isValid = false;
        for (int[] dim : allowedDimensions) {
            if (originalWidth == dim[0] && originalHeight == dim[1]) {
                isValid = true;
                break;
            }
        }

        if (isValid) {
            return originalImage; // No resizing needed
        }

        // Resize to nearest allowed dimensions while maintaining aspect ratio
        double aspectRatio = (double) originalWidth / originalHeight;
        int newWidth = 1024;
        int newHeight = 1024;

        if (aspectRatio > 1.0) {
            // Landscape orientation
            newWidth = 1024;
            newHeight = (int) (1024 / aspectRatio);
        } else {
            // Portrait or square
            newHeight = 1024;
            newWidth = (int) (1024 * aspectRatio);
        }

        // Find closest allowed dimensions
        int[] closestDimensions = findClosestDimensions(newWidth, newHeight, allowedDimensions);
        newWidth = closestDimensions[0];
        newHeight = closestDimensions[1];

        // Create resized image
        BufferedImage resizedImage = new BufferedImage(newWidth, newHeight, BufferedImage.TYPE_INT_RGB);
        Graphics2D g = resizedImage.createGraphics();
        g.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
        g.drawImage(originalBufferedImage, 0, 0, newWidth, newHeight, null);
        g.dispose();

        // Convert back to MultipartFile
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(resizedImage, "jpg", baos);
        byte[] bytes = baos.toByteArray();

        return new MultipartFile() {
            @Override public String getName() { return originalImage.getName(); }
            @Override public String getOriginalFilename() { return originalImage.getOriginalFilename(); }
            @Override public String getContentType() { return originalImage.getContentType(); }
            @Override public boolean isEmpty() { return bytes.length == 0; }
            @Override public long getSize() { return bytes.length; }
            @Override public byte[] getBytes() { return bytes; }
            @Override public java.io.InputStream getInputStream() { return new ByteArrayInputStream(bytes); }
            @Override public void transferTo(java.io.File dest) throws IOException, IllegalStateException {
                new java.io.FileOutputStream(dest).write(bytes);
            }
        };
    }

    private int[] findClosestDimensions(int width, int height, int[][] allowedDimensions) {
        int[] closest = allowedDimensions[0];
        double minDistance = Double.MAX_VALUE;

        for (int[] dim : allowedDimensions) {
            double distance = Math.sqrt(Math.pow(width - dim[0], 2) + Math.pow(height - dim[1], 2));
            if (distance < minDistance) {
                minDistance = distance;
                closest = dim;
            }
        }

        return closest;
    }
}