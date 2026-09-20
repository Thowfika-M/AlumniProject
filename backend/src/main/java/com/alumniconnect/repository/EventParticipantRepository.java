package com.alumniconnect.repository;

import com.alumniconnect.entity.EventParticipant;
import com.alumniconnect.entity.EventParticipantId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventParticipantRepository extends JpaRepository<EventParticipant, EventParticipantId> {
    List<EventParticipant> findByEventId(Long eventId);
    List<EventParticipant> findByUserId(Long userId);
    Boolean existsByEventIdAndUserId(Long eventId, Long userId);
}
