import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Apresentation from './components/Apresentation'
import CreateCategory from './components/CreateCategory'
import CreateProduct from './components/CreateProduct'
import ListCategory from './components/ListCategory'
import ListProduct from './components/ListProduct'

import MenuLeftBar from './components/MenuLeftBar'

const Routes = () => (
    <BrowserRouter>
        <MenuLeftBar />
        <Switch>
            <Route exact path="/" component={Apresentation} />
            <Route path="/createcategory" component={CreateCategory} />
            <Route path="/createproduct" component={CreateProduct} />
            <Route path="/listcategory" component={ListCategory} />
            <Route path="/listproduct" component={ListProduct} />
            <Route path="*" component={() => <h1>Página não encontrada</h1>} />
        </Switch>

    </BrowserRouter>
);

export default Routes;