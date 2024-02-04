package neki.processoseletivo.dto.user;

import neki.processoseletivo.model.EnumTipoUsuario;

public class UserRequest {

    private String email;
    private String password;
    private EnumTipoUsuario perfil;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public EnumTipoUsuario getPerfil() {
        return perfil;
    }

    public void setPerfil(EnumTipoUsuario perfil) {
        this.perfil = perfil;
    }    
}
