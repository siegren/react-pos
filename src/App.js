import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

class Product extends Component {
  
  constructor(props){
    super(props);
    this.state = {qty:0};
    this.buy = this.buy.bind(this); //bind every event
   this.remove = this.remove.bind(this); //bind every event
   this.show = this.show.bind(this);

  }

  buy(){ // methods
    // alert("its working");
    this.setState({qty: this.state.qty + 1});
    this.props.handleTotal(this.props.price);
  }

  remove(){
    if (this.state.qty != 0){
      this.setState({qty: this.state.qty - 1});
      this.props.handleTotal(-this.props.price);

    }
  }

  show(){
    this.props.handleShow(this.props.name);
  }




  render(){
    return(
        <div>
          <p> {this.props.name} = ${this.props.price}</p>
          <button onClick={this.buy}>Buy</button>
           <button onClick={this.remove}>Remove</button>

<button onClick={this.show}>Show</button>
          <h3>{this.state.qty}</h3>
        </div>
      );
  }
}


class Total extends Component{

  // total(){
  //   this.props.handleTotal(this.props.price);
  // }

  render(){
    return(
          <div>
      <h3>Total Balance: ${this.props.total}</h3>
    </div>
    );
  }
}

class ProductForm extends Component{
  constructor(props){
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(e){
    e.preventDefault();
    var product ={
      name: this.refs.name.value,
      price: parseInt(this.refs.price.value)
    };
    this.props.handleCreate(product);
    this.refs.name.value="";
    this.refs.price.value="";

  }

  render(){
    return(
      <form onSubmit={this.submit} >
        <input type="text" placeholder="Prod Name" ref="name" />
        <input type="text" placeholder="Prod Name" ref="price" />
        <br />
        <button>Save Product</button>
      </form>
    );
  }
}

class ProductList extends Component{
  constructor(props){
    super(props);
    this.state = {total:0, productList: [{name: "Samsung", price: 210}, {name: "iPhone", price: 250}]};
    this.calcTotal =  this.calcTotal .bind(this);
    this.createProduct = this.createProduct.bind(this);
  }

  calcTotal(price){
    this.setState({total: this.state.total + price});
  }

  showProduct(name){
    alert("You are buying " + name);
  }

  createProduct(product){
    this.setState({
     productList: this.state.productList.concat(product)
    });

  }
 

  render(){
    
    var component = this;
    var products = this.state.productList.map(function(prod){
      return(
      <Product name={prod.name} price={prod.price} handleShow={component.showProduct} handleTotal={component.calcTotal} />
      );
    });

    return(
      <div>
        <ProductForm handleCreate={this.createProduct}/>
        {products}
        <Total total={this.state.total}/>
      </div>
    );
  }
}

export default ProductList;
