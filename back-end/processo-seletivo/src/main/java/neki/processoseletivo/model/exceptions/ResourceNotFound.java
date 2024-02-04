package neki.processoseletivo.model.exceptions;

public class ResourceNotFound extends RuntimeException {

    public static final long serialVersion = 2L;

    public ResourceNotFound(String message) {
        super(message);
    }
}