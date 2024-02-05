package neki.processoseletivo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import neki.processoseletivo.dto.market.MarketRequest;
import neki.processoseletivo.dto.market.MarketResponse;
import neki.processoseletivo.service.MarketService;

@RestController
@RequestMapping("/api/market")
@CrossOrigin("*")
public class MarketController {

    @Autowired
    private MarketService marketService;

    @GetMapping
    public ResponseEntity<List<MarketResponse>> getAll() {

        return ResponseEntity
                .status(200)
                .body(marketService.getAll());
    }

    @PostMapping
    public ResponseEntity<MarketResponse> addToMarket(
            @RequestBody MarketRequest marketRequest) {

        MarketResponse marketResponse = marketService.addToMarket(marketRequest);

        return ResponseEntity
                .status(200)
                .body(marketResponse);
    }
}
