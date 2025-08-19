package in.ayush.ghbliapi.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class StabilityAIResponse {

    private List<Artifact> artifacts;

    public List<Artifact> getArtifacts() {
        return artifacts;
    }

    public void setArtifacts(List<Artifact> artifacts) {
        this.artifacts = artifacts;
    }

    public static class Artifact {
        @JsonProperty("base64")
        private String base64;

        @JsonProperty("finishReason")
        private String finishReason;

        @JsonProperty("seed")
        private Long seed;  // Changed from Integer to Long

        public String getBase64() {
            return base64;
        }

        public void setBase64(String base64) {
            this.base64 = base64;
        }

        public String getFinishReason() {
            return finishReason;
        }

        public void setFinishReason(String finishReason) {
            this.finishReason = finishReason;
        }

        public Long getSeed() {
            return seed;
        }

        public void setSeed(Long seed) {
            this.seed = seed;
        }
    }
}