package ch.tbz.recipe.planner.mapper;

import ch.tbz.recipe.planner.domain.Recipe;
import ch.tbz.recipe.planner.entities.RecipeEntity;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.UUID;

@SpringBootTest
class RecipeEntityMapperTest {

    @Autowired
    RecipeEntityMapper mapper;

    @Test
    void domainToEntity_mapsFields() {
        var softly = new SoftAssertions();

        Recipe domain = new Recipe();
        domain.setId(UUID.randomUUID());
        domain.setName("Pasta");   // use your real field names
        domain.setDescription("Easy");

        RecipeEntity entity = mapper.domainToEntity(domain);

        softly.assertThat(entity).isNotNull();
        softly.assertThat(entity.getId()).isEqualTo(domain.getId());
        softly.assertThat(entity.getName()).isEqualTo(domain.getName());
        softly.assertThat(entity.getDescription()).isEqualTo(domain.getDescription());

        softly.assertAll();
    }

    @Test
    void entityToDomain_mapsFields() {
        var softly = new SoftAssertions();

        RecipeEntity entity = new RecipeEntity();
        entity.setId(UUID.randomUUID());
        entity.setName("Pizza");
        entity.setDescription("Cheese");

        Recipe domain = mapper.entityToDomain(entity);

        softly.assertThat(domain).isNotNull();
        softly.assertThat(domain.getId()).isEqualTo(entity.getId());
        softly.assertThat(domain.getName()).isEqualTo(entity.getName());
        softly.assertThat(domain.getDescription()).isEqualTo(entity.getDescription());

        softly.assertAll();
    }
}
