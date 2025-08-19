package in.ayush.ghbliapi.client;

import in.ayush.ghbliapi.config.FeignConfig;
import in.ayush.ghbliapi.dto.StabilityAIResponse;
import in.ayush.ghbliapi.dto.TextToImageRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@FeignClient(
        name = "stabilityAiClient",
        url = "${stability.api.base-url}",
        configuration = FeignConfig.class
)
public interface StabilityAIClient {

    @PostMapping(
            value = "/v1/generation/{engine_id}/text-to-image",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    StabilityAIResponse generateImageFromText(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("engine_id") String engineId,
            @RequestBody TextToImageRequest requestBody
    );

    @PostMapping(
            value = "/v1/generation/{engine_id}/image-to-image",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    StabilityAIResponse generateImageFromImage(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable("engine_id") String engineId,
            @RequestPart("init_image") MultipartFile initImage,
            @RequestPart("text_prompts[0][text]") String text,
            @RequestPart("text_prompts[0][weight]") double weight,
            @RequestPart(value = "style_preset", required = false) String stylePreset,
            @RequestPart(value = "image_strength", required = false) Double imageStrength
    );
}