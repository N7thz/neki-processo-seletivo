package neki.processoseletivo.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "skill")
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_skill")
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String imageURL;

    @Column(nullable = false)
    private String level;

    @JsonBackReference
    @OneToMany(mappedBy = "skill")
    private List<UserSkill> UserSkills;

    public Skill() {
    }

    public Skill(Long id, String name, String description, String imageURL, String level, List<UserSkill> userSkills) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageURL = imageURL;
        this.level = level;
        UserSkills = userSkills;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public List<UserSkill> getUserSkills() {
        return UserSkills;
    }

    public void setUserSkills(List<UserSkill> userSkills) {
        UserSkills = userSkills;
    }
}
