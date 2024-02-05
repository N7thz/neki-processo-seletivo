package neki.processoseletivo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import neki.processoseletivo.model.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
}
