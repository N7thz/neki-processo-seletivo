package neki.processoseletivo.model.exceptions;

public class ResourceBadRequest extends RuntimeException {

    public static final long serialVersion = 1L;

    public ResourceBadRequest(String message) {
        super(message);
    }
}