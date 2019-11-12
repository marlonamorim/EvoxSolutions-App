import React, { Component } from 'react';

import './styles.css'

export default class CreateCategory extends Component {

    state = {
        fields: {},
        errors: {},
        categorie: ''
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["categorie"]) {
            formIsValid = false;
            errors["categorie"] = "Campo não pode ser vazio.";
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ categorie: e.target.value, fields })
    }

    handleCreate(context, e) {
        e.preventDefault()
        if (this.handleValidation()) {

            const model = {
                title: this.state.categorie
            }

            fetch('https://localhost:5001/v1/categories', {
                method: 'post',
                body: JSON.stringify(model),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log(result)
                        this.setState({ categorie: '' })
                    },
                    (error) => {
                        let errors = {};
                        errors["categorie"] = error.message;
                        this.setState({ errors: errors })
                    }
                )
        }
    }

    render() {
        return (
            <form>
                <div className="form-group">
                    <label>Categoria: </label>
                    <input type="text"
                        placeholder="Título"
                        name="titulo"
                        className="form-control"
                        value={this.state.categorie}
                        onChange={this.handleChange.bind(this, "categorie")}
                    />
                </div><br></br>
                <button className="btn-success" onClick={e => this.handleCreate(this, e)}>Cadastrar</button><br></br>
                <span style={{ color: "red" }}>{this.state.errors["categorie"]}</span>
            </form>
        );
    }
}
