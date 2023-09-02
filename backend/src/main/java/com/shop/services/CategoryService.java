package com.shop.services;

import com.shop.entity.product.Category;
import com.shop.entity.product.Product;
import com.shop.exception.CategoryException;
import com.shop.exception.ProductException;
import com.shop.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public Category createCategory(Category category) {
        // Check if the parent category exists and save it if necessary
        /*if (category.getParentCategory() != null && category.getParentCategory().getId() == null) {
            category.setParentCategory(createCategory(category.getParentCategory()));
        }*/
        return categoryRepository.save(category);
    }

    public Category getCategory(Long categoryId) throws CategoryException {
        Optional<Category> category = categoryRepository.findById(categoryId);
        if (category.isPresent()){
            return category.get();
        }
        else throw new CategoryException("category not found");
    }
}
