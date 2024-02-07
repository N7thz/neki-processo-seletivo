package neki.processoseletivo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/teste")
@CrossOrigin("*")
public class Teste {

    @GetMapping
    public ResponseEntity<String> teste() {

        return ResponseEntity
                .status(200)
                .body("Teste dos guri");
    }
}
