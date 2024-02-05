package neki.processoseletivo.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import neki.processoseletivo.dto.user.UserRequest;
import neki.processoseletivo.dto.user.UserResponse;
import neki.processoseletivo.dto.user.UserResponseLogin;
import neki.processoseletivo.model.User;
import neki.processoseletivo.model.exceptions.ResourceBadRequest;
import neki.processoseletivo.model.exceptions.ResourceNotFound;
import neki.processoseletivo.repository.UserRepository;
import neki.processoseletivo.security.JWTService;

@Service
public class UserService {

    private static final String BEARER = "Bearer ";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTService jwtService;

    public UserResponse findByEmail(String email) {

        Optional<User> optUser = userRepository.findByEmail(email);

        if (optUser.isEmpty()) {

            throw new ResourceNotFound(
                    "Não existe na base uma pessoa com o Email: " + email);
        }

        return mapper.map(optUser.get(), UserResponse.class);
    }

    public UserResponseLogin logar(String email, String password) {

        Optional<User> optUser = userRepository.findByEmail(email);

        if (optUser.isEmpty()) {
            throw new BadCredentialsException("Usuário ou senha invalidos");
        }

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(
                        email, password, Collections.emptyList()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = BEARER + jwtService.gerarToken(authentication);

        UserResponse userResponse = findByEmail(email);

        return new UserResponseLogin(token, userResponse);
    }

    public List<UserResponse> getAll() {

        List<User> usersModel = userRepository.findAll();

        List<UserResponse> usersResponse = new ArrayList<>();

        for (User user : usersModel) {

            usersResponse.add(mapper.map(user, UserResponse.class));
        }

        return usersResponse;
    }

    public UserResponse createUser(UserRequest userRequest) {

        User userModel = mapper.map(userRequest, User.class);

        String email = userModel.getEmail();

        if (userRepository.findByEmail(email).isPresent()) {

            throw new ResourceBadRequest("Esse e-mail já foi cadastrado");
        }

        String passowrd = passwordEncoder.encode(userModel.getPassword());

        userModel.setPassword(passowrd);
        userModel.setId(0L);
        userModel.setCoins(100);
        userModel.setCreatedAt(new Date());
        userModel.setUserSkills(new ArrayList<>());
        userModel.setNotifications(new ArrayList<>());

        userModel = userRepository.save(userModel);

        UserResponse userResponse = mapper.map(userModel, UserResponse.class);

        return userResponse;
    }
}
