package com.billapp.billapp.Repository;

import com.billapp.billapp.Entity.BillingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BillingRepository extends JpaRepository<BillingEntity,Long> {

}
