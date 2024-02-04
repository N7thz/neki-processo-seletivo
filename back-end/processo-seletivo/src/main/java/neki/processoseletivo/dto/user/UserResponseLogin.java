package neki.processoseletivo.dto.user;

public class UserResponseLogin {

    private String token;
    private UserResponse userResponse;

    public UserResponseLogin() {
    }

    public UserResponseLogin(String token, UserResponse userResponse) {
        this.token = token;
        this.userResponse = userResponse;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public UserResponse getUserResponse() {
        return userResponse;
    }

    public void setUserResponse(UserResponse userResponse) {
        this.userResponse = userResponse;
    }
}
