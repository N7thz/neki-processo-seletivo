package neki.processoseletivo.dto.user;

import java.util.List;

import neki.processoseletivo.model.EnumTipoUsuario;
import neki.processoseletivo.model.Skill;

public class UserResponse {

    private Long id;
    private String email;
    private EnumTipoUsuario perfil;
    private int coins;
    private List<Skill> skills;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public EnumTipoUsuario getPerfil() {
        return perfil;
    }

    public void setPerfil(EnumTipoUsuario perfil) {
        this.perfil = perfil;
    }

    public int getCoins() {
        return coins;
    }

    public void setCoins(int coins) {
        this.coins = coins;
    }

    public List<Skill> getSkills() {
        return skills;
    }

    public void setSkills(List<Skill> skills) {
        this.skills = skills;
    }
}
