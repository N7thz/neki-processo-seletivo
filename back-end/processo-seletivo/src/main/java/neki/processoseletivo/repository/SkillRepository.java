package neki.processoseletivo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import neki.processoseletivo.model.Skill;

public interface SkillRepository extends JpaRepository<Skill, Long> {
    Optional<Skill> findByName(String name);
    Optional<Skill> findByLevel(Number level);
}
