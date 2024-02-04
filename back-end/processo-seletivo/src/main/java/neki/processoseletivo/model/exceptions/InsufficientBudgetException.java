package neki.processoseletivo.model.exceptions;

public class InsufficientBudgetException extends RuntimeException{
    
    public static final long serialVersion = 4L;

    public InsufficientBudgetException(String message) {
        super(message);
    }
}
