package com.billapp.billapp.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.antlr.v4.runtime.misc.NotNull;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "product")
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "productID")
    public long productID;
    @Column(name = "productName")
    @NonNull
    public String productName;
    @ManyToOne
    @JoinColumn(name = "fk_metal_id")
    public MetalEntity metal;
    @Column(name = "weight")
    public int weight;
    @Column(name = "makingCharges")
    public int makingCharges;
    @Column(name = "wastage")
    public int wastage;
    @Column(name = "isStone")
    public boolean isStone;
    @Column(name = "stoneID")
    public int stoneID;
    @Column(name = "stoneWeight")
    public int stoneWeight;
}
