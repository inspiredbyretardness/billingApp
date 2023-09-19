package com.billapp.billapp.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "billing")
public class BillingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO )
    @Column(name = "id")
    public Long id;

    @Column(name="firstName")
    public String firstName;

    @Column(name = "lastName")
    public String lastName;

    @Column(name = "address")
    public String address;

    @Column(name = "contactNumber")
    public Long contactNumber;

    @Column(name = "email")
    public String email;

    @Column(name = "discount")
    public Long discount;
    @Column(name = "sgst")
    public Long sgst;
    @Column(name = "cgst")
    public Long cgst;

    @Column(name = "productID")
    public Long productID;
    @Column(name = "totalAmt")
    public Long totalAmt;
}
