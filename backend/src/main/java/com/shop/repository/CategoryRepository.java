package com.shop.repository;

import com.shop.entity.product.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Long> {

    public Category findByName(String name);
    @Query("select c from Category c where c.name= :name and c.parentCategory.name= :parentCategory")
    Category findByNameAndParentCategory(String name , String parentCategory);

    @Query("select c from Category c where c.level= 1")
    List<Category> getLevelOneCategory();


    @Query("SELECT c FROM Category c WHERE c.level = 2 AND c.parentCategory.id = :categoryId")
    List<Category> getLevelTwoCategory(@Param("categoryId") Long categoryId);


    @Query("SELECT c FROM Category c WHERE c.level = 3 AND c.parentCategory.id = :categoryId")
    List<Category> getLevelThreeCategory(@Param("categoryId") Long categoryId);
}
