package com.shop.repository;

import com.shop.entity.product.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Long> {

    public Category findByName(String name);
    @Query("select c from Category c where c.name= :name and c.parentCategory.name= :parentCategory")
    public Category findByNameAndParentCategory(String name , String parentCategory);
}
