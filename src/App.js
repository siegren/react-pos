import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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
    if (this.props.qty != 0){
    this.setState({qty: this.state.qty + 1});
    this.props.handleTotal(this.props.price);
    this.props.handleQty(this.props.name, -1, this.props.price);
  }
  }

  remove(){
    if (this.state.qty != 0){
      this.setState({qty: this.state.qty - 1});
      this.props.handleTotal(-this.props.price);
      this.props.handleQty(this.props.name, 1, -this.props.price);

    }
  }

  show(){
    this.props.handleShow(this.props.name);
  }





  render(){
    return(
        <div>
          <table>
            <tr>
              <td>{this.props.name} ({this.props.qty}) = ${this.props.price}</td>
              <td><button onClick={this.buy}>+</button></td>
              <td><button onClick={this.remove}>-</button></td>
            </tr>
          </table>       
           
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

class SelectedItem extends Component{

  // total(){
  //   this.props.handleTotal(this.props.price);
  // }

  render(){
    return(
          <div>

      <p>{this.props.name} x{this.props.qty} ${this.props.price}</p>
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
      price: parseInt(this.refs.price.value),
      qty: parseInt(this.refs.qty.value)

    };
    this.props.handleCreate(product);
    this.refs.name.value="";
    this.refs.price.value="";
    this.refs.qty.value="";

  }

  render(){
    return(
      <form onSubmit={this.submit} >
        <input type="text" placeholder="Prod Name" ref="name" />
        <input type="text" placeholder="Prod Price" ref="price" />
        <input type="text" placeholder="Prod Quantity" ref="qty" />
        <button>Save Product</button>
      </form>
    );
  }
}

class ProductList extends Component{
  constructor(props){
    super(props);
    this.state = {
      total:0, 
      productList: [{name: "Book1", qty: 20, price: 210}, {name: "Book2", qty: 10, price: 250}
      ],
      bought: []
    };
    this.calcTotal =  this.calcTotal .bind(this);
    this.createProduct = this.createProduct.bind(this);
    this.calcQty = this.calcQty.bind(this);
  }

  calcTotal(price){
    this.setState({total: this.state.total + price});

  }

  showProduct(name){
    alert("You are buying " + name);
  }

  calcQty(name, qty, price){
    var component = this;
    var products = this.state.productList.map(function(prod){
      if (prod.name == name){
        prod.qty = prod.qty + qty;
        
      }


    });


    if (this.state.bought.length != 0){
       var y = false;
      var yy;
      for(var x = 0; x <= this.state.bought.length - 1; x++){
        if(typeof this.state.bought[x] != "undefined"){
          if(this.state.bought[x]["name"] == name){
          if (qty == 1){
            this.state.bought[x]["qty"] = this.state.bought[x]["qty"] - 1 ;
            this.state.bought[x]["price"] = this.state.bought[x]["price"] + price ;
            yy = this.state.bought[x]["qty"] ;
          }else{
            this.state.bought[x]["qty"] = this.state.bought[x]["qty"] + 1 ;
            this.state.bought[x]["price"] = this.state.bought[x]["price"] + price ;
          
          }

          y = true;
          break;
         }
       }

      }

        if (y == false){

            this.setState({
              bought: this.state.bought.concat({name: name, qty: 1, price: price})
            });

         
         }

        if(yy == 0){
           // let z = this.state.bought.splice(x, 1);
           // alert(z[x]["name"]);
            // this.setState({bought: this.state.bought.splice(x, 1)});
            // alert(this.state.bought.length);

  // alert(this.state.bought.length);
              delete this.state.bought[x];

              // this.setState({bought: this.state.bought});
             
         
        }


   //        var product = this.state.bought.map(function(prod){
   //    if (prod.name == name){
   //      prod.qty = prod.qty + qty;
   //      // if (qty == 1){
   //      //     this.setState({bought: this.state.bought.splice(,1)});
   //      //   }


        
   //        }else{
   //          component.setState({
   //        bought: component.state.bought.concat({name: name, qty: qty})
   //       });
   //    }
   // });

    }else{

          this.setState({
      bought: this.state.bought.concat({name: name, qty: 1, price: price})
    });
    }

  }

  createProduct(product){
    this.setState({
     productList: this.state.productList.concat(product)
    });

  }

  checkout(){
    alert("Thank you for buying");
  }
 

  render(){
    
    var component = this;
    var products = this.state.productList.map(function(prod){
      return(
      <Product name={prod.name} qty={prod.qty} price={prod.price} handleShow={component.showProduct} handleTotal={component.calcTotal} handleQty={component.calcQty}/>
      );
    });

     var items = this.state.bought;
     var selected ;
    if (items.length != 0){
          selected = this.state.bought.map(function(prod){
      return(
      <SelectedItem name={prod.name} qty={prod.qty} price={prod.price} />
      );
    });

    }



    return(
      <div>
        <ProductForm handleCreate={this.createProduct}/>
        {products}
        
        <div>
         <h3>Items</h3>
        {selected}

        </div>
           
        <Total total={this.state.total}/>
        <button onClick={this.checkout}>Checkout</button>
      </div>
    );
  }
}

export default ProductList;
