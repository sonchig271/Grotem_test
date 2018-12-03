import React, { Component } from 'react';
import './Prod.css';


class Product extends Component{
    render(){
        return(
            <div className="product table__row">
                <div className="product__prop table__item table__item_sm" > <label><input id={this.props.id} type="checkbox" 
                onChange = {e => this.props.handleChange(e)}></input></label></div>
                <div className="product__prop table__item table__item_md" ><span>{this.props.group}</span> </div>
                <div className="product__prop table__item table__item_lg" ><span>{this.props.name}</span> </div>
                <div className="product__prop table__item table__item_md" ><span>{this.props.price}</span> </div>
            </div> 
            
        );
    }
}

export default Product;