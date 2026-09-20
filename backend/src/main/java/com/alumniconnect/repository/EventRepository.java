package com.alumniconnect.repository;

import com.alumniconnect.entity.Event;
import com.alumniconnect.entity.EventType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    @Query("SELECT e FROM Event e WHERE " +
           "(:query IS NULL OR LOWER(e.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(e.location) LIKE LOWER(CONCAT('%', :query, '%'))) AND " +
           "(:type IS NULL OR e.eventType = :type) ORDER BY e.createdAt DESC")
    List<Event> searchEvents(@Param("query") String query, @Param("type") EventType type);
}
