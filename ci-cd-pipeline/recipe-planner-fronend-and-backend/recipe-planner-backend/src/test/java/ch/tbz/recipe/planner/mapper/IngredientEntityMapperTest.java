package ch.tbz.recipe.planner.mapper;

import ch.tbz.recipe.planner.domain.Ingredient;
import ch.tbz.recipe.planner.entities.IngredientEntity;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.UUID;

@SpringBootTest
class IngredientEntityMapperTest {

    @Autowired
    IngredientEntityMapper mapper;

    @Test
    void entityToDomain_mapsFields() {
        var softly = new SoftAssertions();

        IngredientEntity entity = new IngredientEntity();
        entity.setId(UUID.randomUUID());
        entity.setName("Tomato");     // adapt to your real fields
        entity.setAmount(2);

        Ingredient domain = mapper.entityToDomain(entity);

        softly.assertThat(domain).isNotNull();
        softly.assertThat(domain.getId()).isEqualTo(entity.getId());
        softly.assertThat(domain.getName()).isEqualTo(entity.getName());
        softly.assertThat(domain.getAmount()).isEqualTo(entity.getAmount());

        softly.assertAll();
    }

    @Test
    void listMapping_works() {
        var softly = new SoftAssertions();

        IngredientEntity a = new IngredientEntity();
        a.setId(UUID.randomUUID());
        a.setName("A");
        a.setAmount(1);

        IngredientEntity b = new IngredientEntity();
        b.setId(UUID.randomUUID());
        b.setName("B");
        b.setAmount(2);

        List<Ingredient> domains = mapper.entitiesToDomains(List.of(a, b));

        softly.assertThat(domains).hasSize(2);
        softly.assertThat(domains.get(0).getName()).isEqualTo("A");
        softly.assertThat(domains.get(1).getName()).isEqualTo("B");

        softly.assertAll();
    }
}
