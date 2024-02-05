package neki.processoseletivo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import neki.processoseletivo.model.Market;

public interface MarketRepository extends JpaRepository<Market, Long> {
}
