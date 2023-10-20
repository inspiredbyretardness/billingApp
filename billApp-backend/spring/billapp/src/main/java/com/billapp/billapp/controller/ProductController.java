package com.billapp.billapp.controller;

import com.billapp.billapp.Entity.ProductEntity;
import com.billapp.billapp.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/product")
public class ProductController {
    @Autowired
    ProductService productService;

    @GetMapping("/getProduct/{id}")
    public Optional<ProductEntity> getProduct(@PathVariable int id){
        return productService.getAProduct(id);
    }
    @PostMapping("/saveProduct")
    public ProductEntity saveProduct(@RequestBody ProductEntity product){
        return productService.saveProduct(product);

    }
    @GetMapping("/getProducts")
    public List<ProductEntity> getProductList(){
        return productService.getAllProducts();
    }
}
