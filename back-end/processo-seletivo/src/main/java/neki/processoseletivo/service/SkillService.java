package neki.processoseletivo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import neki.processoseletivo.dto.skill.SkillRequest;
import neki.processoseletivo.dto.skill.SkillResponse;
import neki.processoseletivo.model.Skill;
import neki.processoseletivo.model.User;
import neki.processoseletivo.model.exceptions.ResourceBadRequest;
import neki.processoseletivo.repository.SkillRepository;
import neki.processoseletivo.repository.UserRepository;

@Service
public class SkillService {

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper mapper;

    public SkillResponse createSkill(SkillRequest skillRequest) {

        Long id = skillRequest.getUser().getId();

        Skill skillModel = mapper.map(skillRequest, Skill.class);

        String name = skillModel.getName();
        int level = skillModel.getLevel();
        User user = skillModel.getUser();

        Optional<Skill> optSkill = skillRepository.findByName(name);

        if (optSkill.isPresent() &&
                optSkill.get().getLevel() == level &&
                optSkill.get().getUser().getId() == user.getId()) {

            throw new ResourceBadRequest("A skill já existe.");
        }

        Optional<User> optUser = userRepository.findById(skillModel.getUser().getId());

        optUser.get().setId(id);

        skillModel.setMarket(false);
        skillModel.setId(0l);
        skillModel.setUser(optUser.get());

        skillModel = skillRepository.save(skillModel);

        SkillResponse skillResponse = mapper.map(skillModel, SkillResponse.class);

        skillResponse.setIdUser(id);

        return skillResponse;
    }

    public List<SkillResponse> getAll() {

        List<Skill> skillls = skillRepository.findAll();
        List<SkillResponse> skillsResponse = new ArrayList<>();

        for (Skill skill : skillls) {
            skillsResponse.add(mapper.map(skill, SkillResponse.class));
        }

        return skillsResponse;
    }

    public List<SkillResponse> getAllByUser(Long id) {

        List<Skill> skillls = skillRepository.findAll();
        List<SkillResponse> skillsByUser = new ArrayList<>();

        for (Skill skill : skillls) {

            if (skill.getUser().getId() == id) {

                skillsByUser.add(mapper.map(skill, SkillResponse.class));
            }
        }

        return skillsByUser;
    }

    public SkillResponse updateSkill(Long id, SkillRequest skillRequest) {

        Skill skillModel = mapper.map(skillRequest, Skill.class);

        checkSkillExist(id);

        skillModel = tratamentoPut(id, skillModel);

        skillRepository.save(skillModel);

        SkillResponse skillResponse = mapper.map(skillModel, SkillResponse.class);

        return skillResponse;
    }

    public void delete(Long id) {

        checkSkillExist(id);
        skillRepository.deleteById(id);
    }

    public void checkSkillExist(Long id) {

        if (!skillRepository.findById(id).isPresent()) {

            throw new ResourceBadRequest("A skill não foi encontrada");
        }
    }

    public Skill tratamentoPut(Long id, Skill skill) {

        Skill oldSkill = skillRepository.findById(id).get();
        skill.setId(id);

        if (skill.getName() == null) {

            skill.setName(oldSkill.getName());
        }
        if (skill.getDescription() == null) {

            skill.setDescription(oldSkill.getDescription());
        }
        if (skill.getImageURL() == null) {

            skill.setImageURL(oldSkill.getImageURL());
        }
        if (skill.getLevel() == 0) {

            skill.setLevel(oldSkill.getLevel());
        }
        if (skill.getUser() == null) {

            skill.setUser(oldSkill.getUser());
        }

        return skill;
    }
}
