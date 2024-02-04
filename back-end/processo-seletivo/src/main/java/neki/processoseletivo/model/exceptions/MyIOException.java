package neki.processoseletivo.model.exceptions;

import java.io.IOException;

public class MyIOException extends IOException {

    public static final long serialVersion = 8L;

    public MyIOException(String message) {
        super(message);
    }
}

