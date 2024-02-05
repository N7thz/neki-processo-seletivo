package neki.processoseletivo.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import neki.processoseletivo.dto.market.MarketRequest;
import neki.processoseletivo.dto.market.MarketResponse;
import neki.processoseletivo.model.Market;
import neki.processoseletivo.model.Skill;
import neki.processoseletivo.model.exceptions.ResourceBadRequest;
import neki.processoseletivo.repository.MarketRepository;
import neki.processoseletivo.repository.SkillRepository;

@Service
public class MarketService {

    @Autowired
    private MarketRepository marketRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private ModelMapper mapper;

    public MarketResponse addToMarket(MarketRequest marketRequest) {

        
        Market marketModel = mapper.map(marketRequest, Market.class);
        
        Skill skill = marketModel.getSkill();

        Optional<Skill> optSkill = skillRepository.findById(skill.getId());

        if (!optSkill.isPresent()) {

            throw new ResourceBadRequest("A skill não foi encontrada");
        }

        marketModel.setSkill(optSkill.get());
        marketModel.setCreated_at(new Date());

        marketModel = marketRepository.save(marketModel);

        MarketResponse marketResponse = mapper.map(marketModel, MarketResponse.class);

        return marketResponse;
    }

    public List<MarketResponse> getAll() {

        List<Market> markets = marketRepository.findAll();
        List<MarketResponse> marketResponse = new ArrayList<>();

        for (Market marketItem : markets) {
            marketResponse.add(mapper.map(marketItem, MarketResponse.class));
        }

        return marketResponse;
    }
}
