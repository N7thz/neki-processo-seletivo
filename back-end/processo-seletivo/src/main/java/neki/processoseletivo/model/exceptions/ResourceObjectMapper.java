package neki.processoseletivo.model.exceptions;

public class ResourceObjectMapper extends RuntimeException {

    public static final long serialVersion = 5L;

    public ResourceObjectMapper(String message) {
        super(message);
    }
}