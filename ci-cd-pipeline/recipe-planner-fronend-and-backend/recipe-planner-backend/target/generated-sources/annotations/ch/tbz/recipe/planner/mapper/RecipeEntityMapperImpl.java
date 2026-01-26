package ch.tbz.recipe.planner.mapper;

import ch.tbz.recipe.planner.domain.Recipe;
import ch.tbz.recipe.planner.entities.RecipeEntity;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-01-26T19:28:42+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 20.0.2.1 (Amazon.com Inc.)"
)
@Component
public class RecipeEntityMapperImpl implements RecipeEntityMapper {

    @Autowired
    private IngredientEntityMapper ingredientEntityMapper;

    @Override
    public Recipe entityToDomain(RecipeEntity recipeEntity) {
        if ( recipeEntity == null ) {
            return null;
        }

        Recipe recipe = new Recipe();

        recipe.setId( recipeEntity.getId() );
        recipe.setName( recipeEntity.getName() );
        recipe.setDescription( recipeEntity.getDescription() );
        recipe.setImageUrl( recipeEntity.getImageUrl() );
        recipe.setIngredients( ingredientEntityMapper.entitiesToDomains( recipeEntity.getIngredients() ) );

        return recipe;
    }

    @Override
    public RecipeEntity domainToEntity(Recipe recipe) {
        if ( recipe == null ) {
            return null;
        }

        RecipeEntity recipeEntity = new RecipeEntity();

        recipeEntity.setId( recipe.getId() );
        recipeEntity.setName( recipe.getName() );
        recipeEntity.setDescription( recipe.getDescription() );
        recipeEntity.setImageUrl( recipe.getImageUrl() );
        recipeEntity.setIngredients( ingredientEntityMapper.domainsToEntities( recipe.getIngredients() ) );

        return recipeEntity;
    }
}
