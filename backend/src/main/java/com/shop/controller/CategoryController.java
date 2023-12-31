package com.shop.controller;

import com.shop.entity.product.Category;
import com.shop.entity.product.Product;
import com.shop.exception.CategoryException;
import com.shop.exception.ProductException;
import com.shop.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/category")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<?> createCategory(
            @RequestBody Category category
    ) throws ProductException {
        return ResponseEntity.ok(categoryService.createCategory(category));
    }
    @GetMapping
    public ResponseEntity<?> getAllCategories(){
        return ResponseEntity.ok(categoryService.getCategories());
    }

    @GetMapping("/levelOne")
    public ResponseEntity<?> getLevelOneCategories(){
        return ResponseEntity.ok(categoryService.getLevelOneCategory());
    }
    @GetMapping("/levelTwo/{categoryId}")
    public ResponseEntity<?> getLevelTwoCategories(@PathVariable Long categoryId){
        return ResponseEntity.ok(categoryService.getLevelTwoCategory(categoryId));
    }
    @GetMapping("/levelThree/{categoryId}")
    public ResponseEntity<?> getLevelThreeCategories(@PathVariable Long categoryId){
        return ResponseEntity.ok(categoryService.getLevelThreeCategory(categoryId));
    }

    @GetMapping("/{categoryId}")
    public ResponseEntity<?> findCategoryById(@PathVariable Long categoryId) throws CategoryException {
        return ResponseEntity.ok(categoryService.getCategory(categoryId));
    }
}
