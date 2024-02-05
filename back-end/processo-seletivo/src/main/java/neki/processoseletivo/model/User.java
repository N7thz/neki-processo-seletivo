package neki.processoseletivo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonBackReference;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "user")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user")
    private Long id;

    @Column(nullable = false)
    private String userName;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private EnumTipoUsuario perfil;

    @Column(nullable = false)
    private int coins;

    @Column(nullable = false)
    private Date createdAt;

    @OneToMany(mappedBy = "user")
    private List<Notification> notifications;

    @OneToMany(mappedBy = "user")
    private List<Skill> userSkills;

    public User() {
    }

    public User(Long id, String userName, String email, String password, EnumTipoUsuario perfil, int coins,
            Date createdAt, List<Notification> notifications, List<Skill> userSkills) {
        this.id = id;
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.perfil = perfil;
        this.coins = coins;
        this.createdAt = createdAt;
        this.notifications = notifications;
        this.userSkills = userSkills;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

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

    public int getCoins() {
        return coins;
    }

    public void setCoins(int coins) {
        this.coins = coins;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public List<Notification> getNotifications() {
        return notifications;
    }

    public void setNotifications(List<Notification> notifications) {
        this.notifications = notifications;
    }

    public List<Skill> getUserSkills() {
        return userSkills;
    }

    public void setUserSkills(List<Skill> userSkills) {
        this.userSkills = userSkills;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() { // essa conta não expira?
        return true;
    }

    @Override
    public boolean isAccountNonLocked() { // essa conta não pode ser bloqueada?
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() { // essa autorização não expira?
        return true;
    }

    @Override
    public boolean isEnabled() { // esta conta está ativa?
        return true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<String> perfis = new ArrayList<>();
        perfis.add(perfil.toString());

        // Converter a lista de perfis em uma lista de Authorities
        return perfis.stream()
                .map(perf -> new SimpleGrantedAuthority(perf))
                // .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }
}
