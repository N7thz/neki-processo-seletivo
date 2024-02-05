package neki.processoseletivo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
    private int level;

    @Column(nullable = false)
    private boolean isMarket;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "id_user", nullable = false)
    private User user;

    public Skill() {
    }

    public Skill(Long id, String name, String description, String imageURL, int level, boolean isMarket, User user) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageURL = imageURL;
        this.level = level;
        this.isMarket = isMarket;
        this.user = user;
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

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public boolean isMarket() {
        return isMarket;
    }

    public void setMarket(boolean isMarket) {
        this.isMarket = isMarket;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
