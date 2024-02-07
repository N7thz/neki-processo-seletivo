package neki.processoseletivo.dto.market;

import java.util.Date;

import neki.processoseletivo.dto.skill.SkillResponse;


public class MarketRequest {
    
    private SkillResponse skill;
    private int price;
    private Date created_at;

    public SkillResponse getSkill() {
        return skill;
    }

    public void setSkill(SkillResponse skill) {
        this.skill = skill;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }
}
