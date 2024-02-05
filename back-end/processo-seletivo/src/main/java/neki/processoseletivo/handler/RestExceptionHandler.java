package neki.processoseletivo.handler;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.fasterxml.jackson.databind.JsonMappingException;

import neki.processoseletivo.common.ConverterData;
import neki.processoseletivo.model.error.ErrorResponse;
import neki.processoseletivo.model.exceptions.InsufficientBudgetException;
import neki.processoseletivo.model.exceptions.MethodNotSupportedException;
import neki.processoseletivo.model.exceptions.MyIOException;
import neki.processoseletivo.model.exceptions.ResourceBadRequest;
import neki.processoseletivo.model.exceptions.ResourceConflict;
import neki.processoseletivo.model.exceptions.ResourceObjectMapper;
import neki.processoseletivo.model.exceptions.ResourceNotFound;

@ControllerAdvice
public class RestExceptionHandler {
    @ExceptionHandler(ResourceBadRequest.class)
    public ResponseEntity<ErrorResponse> handlerBadRequest(ResourceBadRequest badRequest) {

        ErrorResponse errorMessage = new ErrorResponse(400,
                "Bad Request", badRequest.getMessage(), ConverterData.converter(new Date()));
        return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ResourceNotFound.class)
    public ResponseEntity<ErrorResponse> handlerNotFound(ResourceNotFound notFound) {

        ErrorResponse errorMessage = new ErrorResponse(404,
                "Not Found", notFound.getMessage(), ConverterData.converter(new Date()));
        return new ResponseEntity<>(errorMessage, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ResourceConflict.class)
    public ResponseEntity<ErrorResponse> handlerException(ResourceConflict exception) {

        ErrorResponse errorMessage = new ErrorResponse(409,
                "Conflict", exception.getMessage(), ConverterData.converter(new Date()));
        return new ResponseEntity<>(errorMessage, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(ResourceObjectMapper.class)
    public ResponseEntity<ErrorResponse> handlerException(ResourceObjectMapper exception) {

        ErrorResponse errorMessage = new ErrorResponse(400,
                "Mapping an Object", exception.getMessage(), ConverterData.converter(new Date()));
        return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handlerConflict(Exception exception) {

        ErrorResponse errorMessage = new ErrorResponse(500,
                "Internal Server Error", exception.getMessage(), ConverterData.converter(new Date()));
        return new ResponseEntity<>(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(InsufficientBudgetException.class)
    public ResponseEntity<ErrorResponse> handlerInsufficientBudget(InsufficientBudgetException insufficientBudget) {

        ErrorResponse errorMessage = new ErrorResponse(400,
                "Insufficient Budget", insufficientBudget.getMessage(), ConverterData.converter(new Date()));
        return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handlerBadCredentialsException(Exception ex) {

        ErrorResponse erro = new ErrorResponse(401, "Unauthorized", "Usuário ou senha inválidos",
                ConverterData.converter(new Date()));

        return new ResponseEntity<>(erro, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handlerAccessDeniedException(AccessDeniedException ex) {

        ErrorResponse erro = new ErrorResponse(403, "Forbidden", ex.getMessage(), ConverterData.converter(new Date()));

        return new ResponseEntity<>(erro, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(MethodNotSupportedException.class)
    public ResponseEntity<ErrorResponse> MethodNotSupportedException(MethodNotSupportedException ex) {

        ErrorResponse erro = new ErrorResponse(405, "Method Not Allowed", ex.getMessage(),
                ConverterData.converter(new Date()));

        return new ResponseEntity<>(erro, HttpStatus.METHOD_NOT_ALLOWED);
    }

    @ExceptionHandler(MyIOException.class)
    public ResponseEntity<ErrorResponse> handleMyIOException(MyIOException ex) {

        ErrorResponse erro = new ErrorResponse(400, "I/O error while reading input ", ex.getMessage(),
                ConverterData.converter(new Date()));

        return new ResponseEntity<>(erro, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponse> handleHttpMessageNotReadable(HttpMessageNotReadableException ex) {

        Throwable cause = ex.getCause();

        if (cause instanceof MyIOException || cause instanceof JsonMappingException) {

            ErrorResponse erro = new ErrorResponse(400, "JSON Deserialize error", cause.getMessage(),
                    ConverterData.converter(new Date()));

            return new ResponseEntity<>(erro, HttpStatus.BAD_REQUEST);
        }

        ErrorResponse erro = new ErrorResponse(500, "Internal Server Error", cause.getMessage(),
                ConverterData.converter(new Date()));

        return new ResponseEntity<>(erro, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
