import React, { Component } from 'react';

import './styles.css'

export default class ListCategory extends Component {

    state = {
        error: null,
        isLoaded: false,
        items: []
    };

    componentDidMount() {
        fetch('https://localhost:5001/v1/products')
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul className="list-devices">
                    {items.map(item => (
                        <li key={item.id}>
                            <strong>Produto:</strong> {item.title}
                            <strong> Descrição:</strong> {item.description}
                            <strong> Preço:</strong> {item.price}
                            <strong> Categoria:</strong> {item.category.title}
                        </li>
                    ))}
                </ul>
            );
        }
    }
}