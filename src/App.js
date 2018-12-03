import React, { Component } from 'react';
import './App.css';
// import response from './response.json';
import Product from './Product.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products : [],
      groups : [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.sortByPrice = this.sortByPrice.bind(this);
    this.sortByName = this.sortByName.bind(this);

  }

  addToCart(){
    let products = this.state.products;
    products.filter(item => item.isChecked == true).map((el, i) => {el.isSold = true });
    this.setState({products});
  }; 
  
  handleChange(e){
    let id = e.target.id;
    let products = this.state.products;
    let prod = products.find(x => x.id == id);
    let index = products.indexOf(prod);
    prod.isChecked = !prod.isChecked;
    products[index] = prod;
     this.setState({products});
  }

  sortByPrice(e){
    let products = this.state.products;
    if(e.target.value == "asc"){
    products.sort((a,b) => a.price - b.price);
    }else if(e.target.value == "desc"){
      products.sort((a,b) => b.price - a.price);
    }
    this.setState({products});
  }

  sortByName(){
    let products = this.state.products;
    products.sort((a,b) => 
      a.name.localeCompare(b.name)
  );
    this.setState({products});
  }

  handleSelect(e){
    let products = this.state.products;
    if(e.target.value == "all"){
      products.map((el, i) => {el.isVisible = true });

    }else{
    products.filter(item => item.group != e.target.value).map((el, i) => {el.isVisible = false });
    products.filter(item => item.group == e.target.value).map((el, i) => {el.isVisible = true });
    }
    this.setState({products});
  }
  componentDidMount(){
    fetch("https://ssdev.superagent.ru/TestApp/Values/GetWithParent")
      .then(response => response.json())
      .then(data => {
    let products = this.state.products;
    let groups = this.state.groups;
    data.map((el,i) => {
      let group;
      if (el.group != null){
        group = el.group;
        groups.push(group.name);
      
      el.skus.map((el, i) => {
        let product = {
          group : group.name,
          id: el.id,
          name : el.name,
          price : el.price,
          isChecked : false,
          isVisible : true,
          isSold : false,
        }
          products.push(product);
      })
    }
    });
    this.setState({products})
    this.setState({groups})
  });
  }
  render() {
    
    return (
      <div className="app">
      <div className="table"> 
      <div className="table__header">
          <div className="table__title table__item table__item_sm"></div>
          <div className="table__title table__item table__item_md">
            <select className="select" name="select" onChange={this.handleSelect}> 
              <option value="all">Все категории</option>
                {this.state.groups.map((el, i) => <option key={i} value={el}>{el}</option>)}
            </select></div>
          <div className="table__title  table__item table__item_lg pointer" onClick={this.sortByName} ><span>Товар</span><span className="arrow"></span></div>
          <div className="table__title  table__item table__item_md">
          <select className="select" name="select" onChange={this.sortByPrice}> 
              <option value="Цена">Цена</option>
                <option value="desc">По убыванию</option>
                <option value="asc">По возрастанию</option>)
                </select>
          </div>
        </div>
        { this.state.products.map((el, i) => el.name != null && el.isVisible && !el.isSold ? 
           (<Product key={i} group={el.group} id={el.id} name={el.name} price={el.price} isChecked={el.isChecked} handleChange={this.handleChange}/>): null)}
           <button className="button" onClick={this.addToCart}>В корзину</button>
      </div>
      
      </div>
    );
  }
}

export default App;
