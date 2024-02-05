package neki.processoseletivo.dto.market;

import java.util.Date;

import neki.processoseletivo.model.Skill;

public class MarketRequest {

    private Skill skill;
    private int price;
    private Date created_at;

    public Skill getSkill() {
        return skill;
    }

    public void setSkill(Skill skill) {
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
