package neki.processoseletivo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import neki.processoseletivo.dto.skill.SkillRequest;
import neki.processoseletivo.dto.skill.SkillResponse;
import neki.processoseletivo.service.SkillService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/skills")
@CrossOrigin("*")
public class SkillControler {

    @Autowired
    SkillService skillService;

    @PostMapping
    public ResponseEntity<SkillResponse> createSkill(
            @RequestBody SkillRequest skillRequest) {

        SkillResponse skillResponse = skillService.createSkill(skillRequest);

        return ResponseEntity
                .status(201)
                .body(skillResponse);
    }

    @GetMapping
    public ResponseEntity<List<SkillResponse>> getAll() {

        return ResponseEntity
                .status(200)
                .body(skillService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<SkillResponse>> getAllByUser(@PathVariable Long id) {

        return ResponseEntity
                .status(200)
                .body(skillService.getAllByUser(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SkillResponse> updateSkill(
            @PathVariable Long id, @RequestBody SkillRequest skillRequest) {

        SkillResponse skillResponse = skillService.updateSkill(id, skillRequest);

        return ResponseEntity
                .status(200)
                .body(skillResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        skillService.delete(id);

        return ResponseEntity
                .status(204)
                .build();
    }
}
