package com.shop.services;

import com.shop.dto.product.ProductRequest;
import com.shop.entity.product.Product;
import com.shop.exception.ProductException;
import com.shop.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;


    public Product createProduct(Product product)  {

        Product createdProduct = productRepository.save(product) ;
        return createdProduct;
    }
    public ProductRequest updateProduct(Long productId , Product product) throws ProductException {
        Product productToUpdate = findProductById(productId);
        if (product.getQuantity()!=0){
            productToUpdate.setQuantity(product.getQuantity());
        }
        return mapToProductDto(productRepository.save(product));

    }

    public Product findProductById(Long productId) throws ProductException {
        Optional<Product> product = productRepository.findById(productId);
        if (product.isPresent()){
            return product.get();
        }
        else throw new ProductException("Product not found");
    }

    public Page<Product> getFilteredProducts(String category, Float minPrice, Float maxPrice, Integer discount, String sort, String stock, List<String> sizes, List<String> colors, int page, int pageSize) {
        Pageable pageable = PageRequest.of(page, pageSize);
        List<Product> filteredProducts = productRepository.filterProducts(category, minPrice, maxPrice, discount, sort);

        if(colors != null && !colors.isEmpty()){
            filteredProducts=filteredProducts.stream().filter(p->colors.stream().anyMatch(c->c.equalsIgnoreCase(p.getColor()))).collect(Collectors.toList());
        }
        if(stock!=null){
            if(stock.equals("in_stock")){
                filteredProducts=filteredProducts.stream().filter(product -> product.getQuantity()>0).collect(Collectors.toList());
            } else if (stock.equals("out_of_stock")) {
                filteredProducts=filteredProducts.stream().filter(product -> product.getQuantity()<1).collect(Collectors.toList());
            }
        }
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), filteredProducts.size());

        return new PageImpl<>(filteredProducts.subList(start, end), pageable, filteredProducts.size());
    }

    public void deleteProduct(Long productId) throws ProductException {
        Optional<Product> productOptional = productRepository.findById(productId);

        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            product.getSizes().clear();
            productRepository.delete(product);
        } else {
            throw new ProductException("Product not found");
        }
    }

    public List<Product> recentProducts(){
        return productRepository.recentProducts();
    }

    private ProductRequest mapToProductDto(Product product) {
        return ProductRequest.builder()
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .discount(product.getDiscount())
                .discountedPrice(product.getDiscountedPrice())
                .quantity(product.getQuantity())
                .color(product.getColor())
                .image(product.getImage())
                .sizes(new HashSet<>(product.getSizes()))
                .nbRating(product.getNbRating())
                .createdAt(product.getCreatedAt())
                .category(product.getCategory().getName())
                .build();
    }

}
