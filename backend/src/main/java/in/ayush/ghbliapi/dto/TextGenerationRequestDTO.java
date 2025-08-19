package in.ayush.ghbliapi.dto;

import com.sun.jdi.PrimitiveValue;
import lombok.Data;

@Data
public class TextGenerationRequestDTO {

    private String prompt;
    private String style;
}
