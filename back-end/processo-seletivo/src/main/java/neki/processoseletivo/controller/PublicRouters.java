package neki.processoseletivo.controller;

import org.springframework.web.bind.annotation.RestController;

import neki.processoseletivo.dto.user.UserRequestLogin;
import neki.processoseletivo.dto.user.UserResponseLogin;
import neki.processoseletivo.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/api/public")
@CrossOrigin("*")
public class PublicRouters {

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
}
