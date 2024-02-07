package neki.processoseletivo.controller;

import org.springframework.web.bind.annotation.RestController;

import neki.processoseletivo.dto.user.UserRequest;
import neki.processoseletivo.dto.user.UserRequestLogin;
import neki.processoseletivo.dto.user.UserResponse;
import neki.processoseletivo.dto.user.UserResponseLogin;
import neki.processoseletivo.service.UserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

        @Autowired
        private UserService userService;

        @PostMapping("/login")
        public ResponseEntity<UserResponseLogin> login(
                        @RequestBody UserRequestLogin userRequest) {

                UserResponseLogin userLogado = userService.logar(
                                userRequest.getEmail(),
                                userRequest.getPassword());

                return ResponseEntity
                                .status(200)
                                .body(userLogado);
        }

        @GetMapping("/{id}")
        public ResponseEntity<UserResponse> getById(@PathVariable Long id) {

                return ResponseEntity
                .status(200)
                .body(userService.getById(id));
        }

        @GetMapping
        public ResponseEntity<List<UserResponse>> getAll() {

                return ResponseEntity
                                .status(200)
                                .body(userService.getAll());
        }

        @PostMapping
        public ResponseEntity<UserResponse> createUser(@RequestBody UserRequest userRequest) {

                UserResponse userResponse = userService.createUser(userRequest);

                return ResponseEntity
                                .status(201)
                                .body(userResponse);
        }
}
