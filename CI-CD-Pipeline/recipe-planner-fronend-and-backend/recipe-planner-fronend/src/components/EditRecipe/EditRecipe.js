import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Col, Row, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import AddIngredient from "../AddIngredient/AddIngredient";
import "./EditRecipe.css";

const baseURL = "http://localhost:8080/api/recipes";

function EditRecipe() {
    const { id } = useParams(); // route: /recipes/:id/edit
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: null,
        name: "",
        description: "",
        imageUrl: "",
        ingredients: [], // for AddIngredient component (expects ingredient/unit/quantity)
    });

    const [listId, setListId] = useState(1);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const loadRecipe = async () => {
            setLoading(true);
            setStatus(null);

            try {
                const response = await axios.get(`${baseURL}/recipe/${id}`);
                const data = response.data;

                const mappedIngredients = (data.ingredients || []).map((ing, index) => ({
                    listId: index + 1,
                    id: ing.id || null,
                    ingredient: ing.name || "",
                    comment: ing.comment || "",
                    unit: ing.unit || "PIECE",
                    quantity: ing.amount ?? "",
                }));

                setFormData({
                    id: data.id || null,
                    name: data.name || "",
                    description: data.description || "",
                    imageUrl: data.imageUrl || "",
                    ingredients: mappedIngredients,
                });

                setListId(mappedIngredients.length + 1);
            } catch (error) {
                setStatus({ type: "error", message: "Recipe konnte nicht geladen werden." });
            } finally {
                setLoading(false);
            }
        };

        if (id) loadRecipe();
    }, [id]);

    const handleFieldChange = (field) => (e) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const addIngredient = () => {
        setFormData((prev) => ({
            ...prev,
            ingredients: [
                ...prev.ingredients,
                {
                    listId: listId,
                    id: null,
                    ingredient: "",
                    comment: "",
                    unit: "PIECE",
                    quantity: "",
                },
            ],
        }));
        setListId((prev) => prev + 1);
    };

    const updateIngredient = (updatedIngredient) => {
        setFormData((prev) => ({
            ...prev,
            ingredients: prev.ingredients.map((ing) =>
                ing.listId === updatedIngredient.listId ? updatedIngredient : ing
            ),
        }));
    };

    const removeIngredientByListId = (ingredientListId) => {
        setFormData((prev) => ({
            ...prev,
            ingredients: prev.ingredients.filter((ing) => ing.listId !== ingredientListId),
        }));
    };

    const canSubmit = useMemo(() => {
        return (
            formData.name.trim().length > 0 &&
            formData.description.trim().length > 0 &&
            formData.imageUrl.trim().length > 0 &&
            formData.ingredients.length > 0 &&
            formData.ingredients.every((ing) => {
                const nameOk = (ing.ingredient || "").trim().length > 0;
                const qty = Number(ing.quantity);
                const qtyOk = Number.isFinite(qty) && qty > 0; // change to >= 0 if 0 is allowed
                return nameOk && qtyOk;
            })
        );
    }, [formData]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!canSubmit || submitting) return;

        setSubmitting(true);
        setStatus(null);

        const payload = {
            id: formData.id,
            name: formData.name.trim(),
            description: formData.description.trim(),
            imageUrl: formData.imageUrl.trim(),
            ingredients: formData.ingredients.map(({ id, ingredient, comment, unit, quantity }) => ({
                id: id || null,
                name: (ingredient || "").trim(),
                comment: (comment || "").trim(),
                unit,
                amount: Number(quantity),
            })),
        };

        try {
            await axios.put(`${baseURL}/${id}`, payload);
            setStatus({ type: "success", message: "Recipe wurde aktualisiert." });
            navigate("/");
        } catch (error) {
            setStatus({ type: "error", message: "Aktualisierung fehlgeschlagen." });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="bg m-3">
                <Spinner animation="border" role="status" />
                <span className="ms-2">Lade Recipe...</span>
            </div>
        );
    }

    return (
        <div className="bg">
            <div className="m-3">
                <h1 className="h3 bg-dark text-bg-primary mt-2">Edit Recipe</h1>

                {status && (
                    <Alert variant={status.type === "success" ? "success" : "danger"}>
                        {status.message}
                    </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="editRecipeName">
                        <Form.Label>Recipe Name:</Form.Label>
                        <Form.Control
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleFieldChange("name")}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="editRecipeDescription">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleFieldChange("description")}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="editRecipeImageUrl">
                        <Form.Label>Image URL:</Form.Label>
                        <Form.Control
                            placeholder="URL"
                            value={formData.imageUrl}
                            onChange={handleFieldChange("imageUrl")}
                            required
                        />
                    </Form.Group>

                    <Row className="fw-semibold">
                        <Col>Ingredient</Col>
                        <Col>Unit</Col>
                        <Col>Quantity</Col>
                        <Col xs={1}></Col>
                    </Row>
                    <hr />

                    {formData.ingredients.length === 0 && (
                        <p className="text-muted">Fuege mindestens eine Zutat hinzu.</p>
                    )}

                    {formData.ingredients.map((ingredient) => (
                        <AddIngredient
                            key={ingredient.listId}
                            ingredient={ingredient}
                            updateIngredient={updateIngredient}
                            removeIngredient={(ing) => removeIngredientByListId(ing.listId)}
                        />
                    ))}

                    <Row className="mt-3">
                        <Col>
                            <Button variant="warning" type="button" onClick={addIngredient} className="mt-1">
                                Add Ingredient
                            </Button>
                        </Col>
                    </Row>

                    <Button
                        variant="primary"
                        type="submit"
                        className="my-4"
                        disabled={!canSubmit || submitting}
                    >
                        {submitting ? "Saving..." : "Update Recipe"}
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default EditRecipe;
