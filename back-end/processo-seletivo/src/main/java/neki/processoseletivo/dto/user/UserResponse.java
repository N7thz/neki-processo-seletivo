package neki.processoseletivo.dto.user;

import neki.processoseletivo.model.EnumTipoUsuario;

public class UserResponse {

    private Long id;
    private String email;
    private EnumTipoUsuario perfil;

    public UserResponse() {
    }

    public UserResponse(Long id, String token, String email) {
        this.id = id;
        this.email = email;
    }

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
}
