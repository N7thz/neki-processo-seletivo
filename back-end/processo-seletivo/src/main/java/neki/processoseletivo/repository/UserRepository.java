package neki.processoseletivo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import neki.processoseletivo.model.User;

public interface UserRepository extends JpaRepository <User, Long>{
    Optional<User> findByEmail(String email);
}
