package com.billapp.billapp.Service;

import com.billapp.billapp.Entity.ProductEntity;
import com.billapp.billapp.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    ProductRepository productRepository;


    public Optional<ProductEntity> getAProduct(long id){
        return productRepository.findById(id);
    }

    public ProductEntity saveProduct(ProductEntity product){
        return productRepository.save(product);
    }

    public List<ProductEntity>getAllProducts(){
        List<ProductEntity> productEntityList = productRepository.findAll();
        return productRepository.findAll();
    }
}
