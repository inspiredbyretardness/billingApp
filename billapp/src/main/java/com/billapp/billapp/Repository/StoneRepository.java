package com.billapp.billapp.Repository;

import com.billapp.billapp.Entity.StoneEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface StoneRepository extends JpaRepository<StoneEntity,Long> {
    List<StoneEntity>findAllById(Long id);
}
