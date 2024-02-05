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
import neki.processoseletivo.model.Notification;
import neki.processoseletivo.model.Skill;
import neki.processoseletivo.model.User;
import neki.processoseletivo.model.exceptions.ResourceBadRequest;
import neki.processoseletivo.repository.MarketRepository;
import neki.processoseletivo.repository.NotificationRepository;
import neki.processoseletivo.repository.SkillRepository;
import neki.processoseletivo.repository.UserRepository;

@Service
public class MarketService {

    @Autowired
    private MarketRepository marketRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private ModelMapper mapper;

    public MarketResponse addToMarket(MarketRequest marketRequest) {

        Market marketModel = mapper.map(marketRequest, Market.class);

        Skill skill = marketModel.getSkill();

        Optional<Skill> optSkill = skillRepository.findById(skill.getId());

        skill = optSkill.get();

        if (skill.isMarket()) {

            throw new ResourceBadRequest("A skill já está no mercado.");
        }

        User user = optSkill.get().getUser();

        Optional<User> optUser = userRepository.findById(user.getId());

        user = optUser.get();

        if (!optSkill.isPresent()) {

            throw new ResourceBadRequest("A skill não foi encontrada");
        }

        String message = "A skill " + skill.getName() + " level " + skill.getLevel() + " foi adicionada ao mercado.";

        Notification notification = new Notification(
                0l,
                message,
                user);

        optSkill.get().setMarket(true);

        marketModel.setSkill(optSkill.get());
        marketModel.setCreated_at(new Date());

        notification = notificationRepository.save(notification);
        skill = skillRepository.save(optSkill.get());
        marketModel = marketRepository.save(marketModel);

        MarketResponse marketResponse = mapper.map(marketModel, MarketResponse.class);

        return marketResponse;
    }

    public MarketResponse buySkill(
            Long id, MarketResponse marketResponse) {

        Market marketModel = mapper.map(marketResponse, Market.class);

        marketModel = marketRepository.findById(marketModel.getId()).get();

        User userBuyer = userRepository.findById(id).get();
        User userSeller = userRepository.findById(
                marketModel.getSkill().getUser().getId()).get();
        Skill skill = marketModel.getSkill();

        if (marketModel.getPrice() > userBuyer.getCoins()) {

            throw new ResourceBadRequest("Saldo insuficiente para comprar a skill.");
        }

        skill.setUser(userBuyer);
        skill.setMarket(false);

        userBuyer.setCoins(userBuyer.getCoins() - marketModel.getPrice());
        userSeller.setCoins(userSeller.getCoins() + marketModel.getPrice());

        String messageBuyer = "A skill " + marketModel.getSkill().getName() + " level "
                + marketModel.getSkill().getLevel() + " foi comprada com sucesso.";

        String messageSeller = "A skill " + marketModel.getSkill().getName() + " level "
                + marketModel.getSkill().getLevel() + " foi vendida com sucesso.";

        Notification notificationBuyer = new Notification(
                0l, messageBuyer, userBuyer);

        Notification notificationSeller = new Notification(
                0l, messageSeller, userSeller);

        notificationBuyer = notificationRepository.save(notificationBuyer);
        notificationSeller = notificationRepository.save(notificationSeller);

        userBuyer = userRepository.save(userBuyer);
        userSeller = userRepository.save(userSeller);

        marketResponse = mapper.map(marketModel, MarketResponse.class);

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
