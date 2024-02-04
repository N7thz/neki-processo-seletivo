package neki.processoseletivo.security;

import java.util.Date;
import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import neki.processoseletivo.model.User;

@Service
public class JWTService {

    // chave secreta utilizada pelo JWT para codificar e decodificar o TOKEN.
    private static final String SECURITY_KEY = "ChaveMuitoSecreta";

    public String gerarToken(Authentication authentication) {

        int tempoExpiracao = 86400000; // 24 horas em milissegundos, e pode variar de acordo com a regra de negócio

        Date dataExpiracao = new Date(new Date().getTime() + tempoExpiracao); 
        User user = (User) authentication.getPrincipal();

        // retorna o TOKEN jwt.
        return Jwts.builder()
                .setSubject(user.getId().toString()) // identificador único do usuário
                .setIssuedAt(new Date()) // data da geração do TOKEN
                .setExpiration(dataExpiracao) // data de expiração do token
                .signWith(SignatureAlgorithm.HS256, SECURITY_KEY) // algoritmo de criptografia e a chave secreta
                .compact(); // pega tudo e gera o token
    }

    // método para retornar o id do usuário dono do TOKEN
    public Optional<Long> obterIdDoUsuario(String token) {
        try { // Aqui pego a claim do TOKEN para achar o usuário dono dele
            Claims claims = Jwts
                    .parser()
                    .setSigningKey(SECURITY_KEY)
                    .parseClaimsJws(token)
                    .getBody();
            // se achou o id dentro da claim, ele devolve, senão ele devolve null
            return Optional.ofNullable(Long.parseLong(claims.getSubject()));
        } catch (Exception e) {

            return Optional.empty();
        }
    }
}
