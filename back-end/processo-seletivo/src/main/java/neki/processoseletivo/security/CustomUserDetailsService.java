package neki.processoseletivo.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import neki.processoseletivo.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    // esse método sabe carregar o usuário através do email
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // método que vai obter dinamicamente o usuário no banco pelo username que no
        // nosso caso é o email
        return userRepository.findByEmail(username).get();
    }

    public UserDetails obterUsuarioPeloId(Long id) {
        // 
        return userRepository.findById(id).get();
    }

}
