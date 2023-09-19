package com.billapp.billapp.controller;

import com.billapp.billapp.Entity.BillingEntity;
import com.billapp.billapp.Service.BillingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/billing")
public class BillingController {
    @Autowired
    BillingService billingService;
    @PostMapping("/saveBill")
    public BillingEntity saveBill(@RequestBody BillingEntity billingEntity){
        return billingService.saveBill(billingEntity);
    }
}
