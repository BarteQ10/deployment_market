import React,{Component} from "react";
import { variables } from "./Variables";
export class Transaction extends Component{
    constructor(props){
        super(props);
        this.state={
            transactions:[],           
            modalTitle:"",
            value:0,
            transactionDate:"",
            id:0,
            transactiondetail:[],
            transactionId:0,
            price:0,
            qnt:0,
            name:"",
            products:[],
            productId:0
        }
    }

    refreshList(){
        fetch(variables.API_URL+'Transactions')
        .then(response => response.json())
        .then(data =>{
            this.setState({transactions:data});
        });
        fetch(variables.API_URL+'TransactionDetails')
        .then(response => response.json())
        .then(data =>{
            this.setState({transactiondetail:data});
        });
        fetch(variables.API_URL+'Products')
        .then(response => response.json())
        .then(data =>{
            this.setState({products:data});
        });
    }
    componentDidMount(){
        this.refreshList();
    }
    addClick(){
        fetch(variables.API_URL+'Transactions',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Transaction added');
            this.refreshList();
        })              
    }
    showClick(tran){
        this.setState({
            id:tran.id,
            modalTitle:"Transaction "+tran.id           
        });
    }
    addTransactionDetail(){
        fetch(variables.API_URL+'TransactionDetails',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                transactionId:this.state.id,
                qnt:this.state.qnt,
                productId:this.state.productId
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Transaction details added');
            this.refreshList();
        })     
    }
    changeProductId=(e)=>{
        this.setState({productId:e.target.value});
    }
    changeQnt=(e)=>{
        this.setState({qnt:e.target.value});
    }
    
    render(){
        const{
            transactions,
            modalTitle,            
            id,
            transactiondetail,           
            qnt,
            products,
            productId
        }=this.state;
        return(
<div>
<h5>Sometimes it take around 10s to get reply from Web Api for first time later it work well</h5>
<button type="button"
    className="btn btn-primary m-2 float-end"
    onClick={()=>this.addClick()}>
        Add Transaction
</button>
<table className="table table-striped">
<thead>
<tr>
    <th>
        TransactionId
    </th>
    <th>
        Value
    </th>
    <th>
        Date
    </th>   
    <th>
        Hour
    </th>  
    <th>
        Options
    </th> 
</tr>
</thead>
<tbody>
    {transactions.map(tran=>
            <tr key={tran.id}>
                <td>{tran.id}</td>
                <td>{tran.value.toFixed(2)}zł</td>
                <td>{tran.transactionDate.substr(-30,10)}</td>
                <td>{tran.transactionDate.substr(11,8)}</td>
                <td>
                    <button type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={()=>this.showClick(tran)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                        </svg>
                    </button>
                </td>
            </tr>)}
</tbody>
</table>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
<div className="modal-dialog modal-lg modal-dialog-centered">
<div className="modal-content">
   <div className="modal-header">
        <h5 className="modal-title">{modalTitle}</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">           
        </button>
    </div>
    <div className="modal-body">
    <table className="table table-striped">
    <thead>
    <tr>
        <th>
            TransactionId
        </th>
        <th>
            Price
        </th>
        <th>
            Qnt
        </th>   
        <th>
            Name Product
        </th>         
    </tr>
    </thead>
    <tbody>
    {transactiondetail.map((trand)=>       
        trand.transactionId === id ? 
        <tr key={trand.id}>
            <td>{trand.transactionId}</td>
            <td>{trand.price}</td>
            <td>{trand.qnt}</td>
            <td>{trand.name}</td>
        </tr>                    
        : null)}
    </tbody>    
    </table>
    Add
    <div className="input-group mb-3">
            <span className="input-group-text">Product</span>
            <select className="form-select"
            onChange={this.changeProductId}
            value={productId}>
                <option></option>
                {products.map(prod=><option key={prod.id} value={prod.id}>
                    {prod.name}
                </option>)}
            </select>
    </div>
    <div className="input-group mb-3">
            <span className="input-group-text">Quantity</span>
            <input type="number" className="form-control"
            value={qnt}
            onChange={this.changeQnt}/>
    </div>
    <button type="button"  
        className="btn btn-primary float-start"
        onClick={()=>this.addTransactionDetail()}>
        Add Transaction Detail
    </button>

    </div>
</div>
</div>
</div>


</div>     
        )
}
}