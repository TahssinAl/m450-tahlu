package ch.tbz.recipe.planner.controller;

import ch.tbz.recipe.planner.domain.Recipe;
import ch.tbz.recipe.planner.mapper.RecipeEntityMapper;
import ch.tbz.recipe.planner.repository.RecipeRepository;
import ch.tbz.recipe.planner.service.RecipeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(RecipeController.class)
class RecipeControllerTest {

    @Autowired
    MockMvc mvc;

    @MockBean
    RecipeService service;

    @MockBean
    RecipeEntityMapper mapper;

    @MockBean
    RecipeRepository recipeRepository;

    @Test
    void getRecipes_shouldReturn200() throws Exception {
        when(service.getRecipes()).thenReturn(List.of());

        mvc.perform(get("/api/recipes"))
                .andExpect(status().isOk());
    }

    @Test
    void getRecipe_shouldReturn200() throws Exception {
        UUID id = UUID.randomUUID();
        when(service.getRecipeById(id)).thenReturn(new Recipe());

        mvc.perform(get("/api/recipes/recipe/{recipeId}", id))
                .andExpect(status().isOk());
    }

    @Test
    void addRecipe_shouldReturn200() throws Exception {
        when(service.addRecipe(any(Recipe.class))).thenReturn(new Recipe());

        mvc.perform(post("/api/recipes")
                        .contentType("application/json")
                        .content("{}"))
                .andExpect(status().isOk());
    }
}
