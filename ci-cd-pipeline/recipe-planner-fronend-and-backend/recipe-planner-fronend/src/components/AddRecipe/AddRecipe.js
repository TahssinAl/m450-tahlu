import React, { useState } from "react";
import "./AddRecipe.css";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";
import AddIngredient from "../AddIngredient/AddIngredient";

const API = "http://localhost:8080/api/recipes";

function AddRecipe() {
    const [formData, setFormData] = useState({
        id: null,
        name: "",
        description: "",
        imageUrl: "",
        ingredients: [],
    });

    const [listId, setListId] = useState(1);

    const addIngredient = () => {
        setFormData((prev) => ({
            ...prev,
            ingredients: [
                ...prev.ingredients,
                {
                    listId: listId,
                    ingredient: "", // UI field -> maps to backend "name"
                    comment: "",    // backend has comment (optional)
                    unit: "PIECE",
                    quantity: "",   // UI field -> maps to backend "amount"
                },
            ],
        }));
        setListId((prev) => prev + 1);
    };

    const updateIngredient = (ingredientObj) => {
        const updatedIngredients = formData.ingredients.map((ing) =>
            ing.listId === ingredientObj.listId ? ingredientObj : ing
        );
        setFormData((prev) => ({ ...prev, ingredients: updatedIngredients }));
    };

    const removeIngredient = (ingredientObj) => {
        const updatedIngredients = formData.ingredients.filter(
            (ing) => ing.listId !== ingredientObj.listId
        );
        setFormData((prev) => ({ ...prev, ingredients: updatedIngredients }));
    };

    const onChange = (field) => (e) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        // map UI ingredients -> backend IngredientEntity fields
        const payload = {
            id: null,
            name: formData.name,
            description: formData.description,
            imageUrl: formData.imageUrl,
            ingredients: formData.ingredients.map((i) => ({
                // id omitted -> backend generates UUID
                name: i.ingredient,
                comment: i.comment || "",
                unit: i.unit,
                amount: Number(i.quantity || 0),
            })),
        };

        try {
            const res = await axios.post(API, payload);
            console.log("Created recipe:", res.data);

            // optional: clear form after submit
            setFormData({
                id: null,
                name: "",
                description: "",
                imageUrl: "",
                ingredients: [],
            });
            setListId(1);

            alert("Recipe created!");
        } catch (err) {
            console.error(err);
            alert("Create failed (check backend + console).");
        }
    };

    const renderIngredients = formData.ingredients.map((ingredient) => (
        <AddIngredient
            key={ingredient.listId}
            ingredient={ingredient}
            updateIngredient={updateIngredient}
            removeIngredient={removeIngredient}
        />
    ));

    return (
        <div className="bg">
            <div className="m-3">
                <h1 className="h3 bg-dark text-bg-primary mt-2">Add Recipe</h1>

                {/* ✅ Wrap everything in a Form with onSubmit */}
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-1" controlId="formBasicName">
                        <Form.Label>Recipe Name:</Form.Label>
                        <Form.Control
                            placeholder="Name"
                            value={formData.name}
                            onChange={onChange("name")}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-1" controlId="formBasicDescription">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                            placeholder="Description"
                            value={formData.description}
                            onChange={onChange("description")}
                        />
                    </Form.Group>

                    <Form.Group className="mb-1 mb-5" controlId="formBasicImageUrl">
                        <Form.Label>Image URL:</Form.Label>
                        <Form.Control
                            placeholder="URL"
                            value={formData.imageUrl}
                            onChange={onChange("imageUrl")}
                        />
                    </Form.Group>

                    <Row>
                        <Col>Ingredient</Col>
                        <Col>Unit</Col>
                        <Col>Quantity</Col>
                        <Col xs={1}></Col>
                    </Row>
                    <hr />

                    {renderIngredients}

                    <Row className="mt-2">
                        <Button variant="warning" type="button" onClick={addIngredient}>
                            Add Ingredient
                        </Button>
                    </Row>

                    <Button variant="primary" type="submit" className="mb-5 mt-3">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default AddRecipe;