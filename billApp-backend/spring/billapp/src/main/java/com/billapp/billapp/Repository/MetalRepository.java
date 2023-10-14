package com.billapp.billapp.Repository;

import com.billapp.billapp.Entity.MetalEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MetalRepository extends JpaRepository<MetalEntity,Long> {
}
