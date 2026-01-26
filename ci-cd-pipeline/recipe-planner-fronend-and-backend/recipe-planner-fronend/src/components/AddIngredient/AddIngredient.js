import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const AddIngredient = ({ ingredient, updateIngredient, removeIngredient }) => {
    const onChange = (field) => (e) => {
        updateIngredient({ ...ingredient, [field]: e.target.value });
    };

    return (
        <Row>
            <Col>
                <Form.Control
                    placeholder="Name"
                    value={ingredient.ingredient || ""}
                    onChange={onChange("ingredient")}
                />
            </Col>

            <Col>
                <Form.Select value={ingredient.unit || "PIECE"} onChange={onChange("unit")}>
                    <option value="PIECE">PIECE</option>
                    <option value="GRAMM">GRAMM</option>
                    <option value="KILOGRAMM">KILOGRAMM</option>
                    <option value="LITRE">LITRE</option>
                    <option value="DECILITRE">DECILITRE</option>
                </Form.Select>
            </Col>

            <Col>
                <Form.Control
                    placeholder="Quantity"
                    type="number"
                    value={ingredient.quantity === null || ingredient.quantity === undefined ? "" : ingredient.quantity}
                    onChange={onChange("quantity")}
                />
            </Col>

            <Col xs={1}>
                <Button type="button" variant="outline-dark" onClick={() => removeIngredient(ingredient)}>
                    x
                </Button>
            </Col>
        </Row>
    );
};

export default AddIngredient;