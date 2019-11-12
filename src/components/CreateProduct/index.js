import React, { Component } from 'react';

import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

import './styles.css'

export default class CreateProduct extends Component {

    state = {
        fields: {},
        errors: {},
        erroListCategories: null,
        isLoaded: false,
        categories: [],
        title: '',
        description: '',
        price: '',
        categoryId: 0
    }

    componentDidMount() {
        fetch('https://localhost:5001/v1/categories')
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        isLoaded: true,
                        categories: result,
                        categoryId: result.length > 0 ? result[0].id : 0
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        erroListCategories: error
                    });
                }
            )
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["title"]) {
            formIsValid = false;
            errors["title"] = "Campo não pode ser vazio.";
        }

        if (!fields["description"]) {
            formIsValid = false;
            errors["description"] = "Campo não pode ser vazio.";
        }

        if (!fields["price"]) {
            formIsValid = false;
            errors["price"] = "Campo não pode ser vazio.";
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;

        if (field === 'title') this.setState({ title: e.target.value, fields })
        if (field === 'description') this.setState({ description: e.target.value, fields })
        if (field === 'price') this.setState({ price: e.target.value, fields })
    }

    handleCreate(context, e) {
        e.preventDefault()
        if (this.handleValidation()) {

            const model = {
                title: this.state.title,
                description: this.state.description,
                price: parseInt(this.state.price),
                categoryId: parseInt(this.state.categoryId)
            }

            fetch('https://localhost:5001/v1/products', {
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
                        this.setState({ title: '' })
                        this.setState({ description: '' })
                        this.setState({ price: '' })
                    },
                    (error) => {
                        let errors = {};
                        errors["title"] = error.title;
                        this.setState({ errors: errors })
                    }
                )
        }
    }

    handleOnSelect(e) {
        this.setState({ categoryId: e.value })
    }

    renderListCategories() {
        const { erroListCategories, isLoaded, categories } = this.state;
        const options = []
        categories.map(item => options.push({ value: item.id, label: item.title }))

        if (erroListCategories) {
            return <div>Error: {erroListCategories.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <select className='list-categories'
                    onChange={(e) => this.handleOnSelect(e)}>
                    {options.map((team) => <option key={team.value} value={team.value}>{team.label}</option>)}
                </select>
            );
        }
    };

    render() {
        return (
            <form>
                {this.renderListCategories()}

                <div className="form-group">
                    <label>Produto: </label>
                    <input type="text"
                        placeholder="Título"
                        name="titulo"
                        className="form-control"
                        value={this.state.title}
                        onChange={this.handleChange.bind(this, "title")}
                    />
                </div><br></br>
                <div className="form-group">
                    <label>Descrição: </label>
                    <input type="text"
                        placeholder="Descrição"
                        name="descrição"
                        className="form-control"
                        value={this.state.description}
                        onChange={this.handleChange.bind(this, "description")}
                    />
                </div><br></br>
                <div className="form-group">
                    <label>Preço: </label>
                    <input type="text"
                        placeholder="Preço"
                        name="preço"
                        className="form-control"
                        value={this.state.price}
                        onChange={this.handleChange.bind(this, "price")}
                    />
                </div><br></br><br></br>
                <button className="btn-success" onClick={e => this.handleCreate(this, e)}>Cadastrar</button><br></br>
                <span style={{ color: "red" }}>{this.state.errors["title"] || this.state.errors["description"] || this.state.errors["price"]}</span>
            </form>
        );
    }
}
