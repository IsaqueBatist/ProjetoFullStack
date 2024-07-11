package com.abutua.project_backend.controller;

import java.net.URI;
import java.util.Arrays;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.abutua.project_backend.models.Product;

@RestController
@CrossOrigin
public class ProductController {

  // private List<Product> products = new ArrayList<>();
  private List<Product> products = Arrays.asList(new Product(1, "Product 1", "TV-LED", 1200, 1, false, true),
      new Product(2, "Product 2", "TV-LED", 1200, 2, false, true),
      new Product(3, "Product 3", "TV-LED", 1200,3, true, true),
      new Product(4, "Product 4", "TV-LED", 1500, 4, true, true)
    );

  @GetMapping("products/{id}")
  public ResponseEntity<Product> getProduct(@PathVariable("id") int id) {
    Product prod = products.stream()
        .filter(p -> p.getId() == id)
        .findFirst()
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
    return ResponseEntity.ok(prod);

    // Maneira "Antiga"
    // if(id <= products.size()){
    // return ResponseEntity.ok(products.get(id-1));
    // }
    // throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found");
  }

  @GetMapping("products")
  public ResponseEntity<Product> save(@RequestBody Product product){
    product.setId(products.size() + 1);
    products.add(product);

      URI location = ServletUriComponentsBuilder
        .fromCurrentRequest()
        .path("/{id}")
        .buildAndExpand(product.getId())
        .toUri();

    return ResponseEntity.created(location).body(product);
  }


  @GetMapping("products")
  public List<Product> getProducts() {
    return products;
  }

}
