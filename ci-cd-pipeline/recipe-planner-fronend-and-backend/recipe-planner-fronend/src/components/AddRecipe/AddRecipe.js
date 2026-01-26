import React, { useState } from "react";
import "./AddRecipe.css";
import { Form, Button, Col, Row, Alert } from "react-bootstrap";
import axios from "axios";
import AddIngredient from "../AddIngredient/AddIngredient";

function AddRecipe() {
  const [ingredients, setIngredients] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    ingredients: [],
    id: null,
  });

  const [listId, setListId] = useState(1);

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [
        ...prev.ingredients,
        {
          listId: listId,
          ingredient: "",
          unit: "PIECE",
          quantity: "",
        },
      ],
    }));
    setListId((prev) => prev + 1);
  };

  const updateIngredient = (ingredientObj) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((ing) =>
        ing.listId === ingredientObj.listId ? ingredientObj : ing
      ),
    }));
  };

  const removeIngredient = (ingredientObj) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter(
        (ing) => ing.listId !== ingredientObj.listId
      ),
    }));
  };

  const renderIngredients = formData.ingredients.map((ingredient) => (
    <AddIngredient
      key={ingredient.listId}
      ingredient={ingredient}
      ingredients={ingredients}
      listId={listId - 1}
      updateIngredient={updateIngredient}
      removeIngredient={removeIngredient}
    />
  ));

  const handleSubmitRecipe = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const payload = {
      ...formData,
      ingredients: formData.ingredients.map(({ listId, ...rest }) => rest),
    };

    try {
      // Use 127.0.0.1 to avoid some "localhost" networking issues in certain setups
      await axios.post("http://127.0.0.1:8080/api/recipes", payload, {
        headers: { "Content-Type": "application/json" },
        timeout: 10000,
      });

      setFormData({
        name: "",
        description: "",
        imageUrl: "",
        ingredients: [],
        id: null,
      });
      setListId(1);
      setIngredients([]);

      setSuccessMsg("Recipe created successfully!");
    } catch (error) {
      // Give a more useful message than just "Network Error"
      if (error.response) {
        setErrorMsg(
          `Backend error: ${error.response.status} ${JSON.stringify(
            error.response.data
          )}`
        );
      } else if (error.request) {
        setErrorMsg(
          "Network Error: Backend not reachable. Is Spring Boot running on http://127.0.0.1:8080 and CORS enabled for http://localhost:3000?"
        );
      } else {
        setErrorMsg(`Error: ${error.message}`);
      }
      // keep console log for debugging
      console.error("Error creating recipe", error);
    }
  };

  return (
    <>
      <div className="bg">
        <div className="m-3">
          <h1 className="h3 bg-dark text-bg-primary mt-2">Add Recipe</h1>

          {errorMsg && (
            <Alert variant="danger" className="mt-3">
              {errorMsg}
            </Alert>
          )}
          {successMsg && (
            <Alert variant="success" className="mt-3">
              {successMsg}
            </Alert>
          )}

          <Form onSubmit={handleSubmitRecipe}>
            <Form.Group className="mb-1" controlId="formBasicName">
              <Form.Label>Recipe Name:</Form.Label>
              <Form.Control
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </Form.Group>

            <Form.Group className="mb-1" controlId="formBasicDescription">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </Form.Group>

            <Form.Group className="mb-1 mb-5" controlId="formBasicImageUrl">
              <Form.Label>Image URL:</Form.Label>
              <Form.Control
                placeholder="URL"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))
                }
              />
            </Form.Group>

            <Row>
              <Col>Ingredient</Col>
              <Col>Unit</Col>
              <Col>Quanity</Col>
              <Col xs={1}></Col>
            </Row>

            <hr />

            {renderIngredients}

            <Row>
              <Button
                variant="warning"
                onClick={addIngredient}
                className="mt-1"
                type="button"
              >
                Add Ingredient
              </Button>
            </Row>

            <Button variant="primary" type="submit" className="mb-5 mt-3">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default AddRecipe;

