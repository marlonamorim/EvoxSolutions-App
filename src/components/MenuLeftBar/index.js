import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './styles.css'

class MenuLeftBar extends Component {

    render() {
        return (
            <div className="vertical-menu">
                <Link className="active" to="/createcategory">Cadastrar categoria</Link>
                <Link className="active" to="/listcategory">Consultar categorias</Link>
                <Link className="active" to="/createproduct">Cadastrar produto</Link>
                <Link className="active" to="/listproduct">Consultar produtos</Link>
            </div>
        );
    }
}

export default MenuLeftBar;
