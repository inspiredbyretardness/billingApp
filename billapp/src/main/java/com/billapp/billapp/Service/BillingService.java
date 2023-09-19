package com.billapp.billapp.Service;

import com.billapp.billapp.Entity.BillingEntity;
import com.billapp.billapp.Repository.BillingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BillingService {
    @Autowired
    BillingRepository billingRepository;

    public BillingEntity saveBill(BillingEntity billingEntity){
        return billingRepository.save(billingEntity);
    }
}
