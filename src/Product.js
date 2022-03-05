import React,{Component} from "react";
import { variables } from "./Variables";

export class Product extends Component{
    
    constructor(props){
        super(props);
        this.state={
            categories:[],
            products:[],
            modalTitle:"",
            name:"",
            desc:"",
            id:0,
            categoryId:0,
            price:0,
            qnt:0
        }
    }

    refreshList(){
        fetch(variables.API_URL+'Categories')
        .then(response => response.json())
        .then(data =>{
            this.setState({categories:data});
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

    changeProductName=(e)=>{
        this.setState({name:e.target.value});
    }
    changeDescription=(e)=>{
        this.setState({desc:e.target.value});
    }
    changeCategory=(e)=>{
        this.setState({categoryId:e.target.value});
    }
    changePrice=(e)=>{
        this.setState({price:e.target.value});
    }
    changeQnt=(e)=>{
        this.setState({qnt:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Add Product",
            id:0,
            name:"",
            desc:"",
            categoryId:0,
            price:0,
            qnt:0
        });
    }
    editClick(prod){
        this.setState({
            modalTitle:"Edit Product",
            id:prod.id,
            name:prod.name,
            desc:prod.desc,
            categoryId:prod.categoryId,
            price:prod.price,
            qnt:prod.qnt
        });
    }

    createClick(){
        fetch(variables.API_URL+'Products',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    name:this.state.name,
                    desc:this.state.desc,                    
                    price:this.state.price,
                    qnt:this.state.qnt,
                    categoryId:this.state.categoryId
                })
            })
            .then(res=>res.json())
            .then((result)=>{
                alert(result);
                this.refreshList();
            },(error)=>{
                alert('Product created');
            })        
    }

    updateClick(){
        fetch(variables.API_URL+'Products/'+this.state.id,{
                method:'PUT',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    id:this.state.id,
                    name:this.state.name,
                    desc:this.state.desc,
                    price:this.state.price,
                    qnt:this.state.qnt,
                    categoryId:this.state.categoryId
                })
            })
            .then(res=>res.json())
            .then((result)=>{
                alert(result);
                this.refreshList();
            },(error)=>{
                alert('Product edited');
                this.refreshList();
            })        
    }

    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'Products/'+id,{
                method:'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(res=>res.json())
            .then((result)=>{
                alert(result);
                this.refreshList();
            },(error)=>{
                alert('Product deleted');                
            })   
        }     
    }  

    render(){
        const{
            categories,
            products,
            modalTitle,
            id,
            name,
            desc,
            categoryId,
            price,
            qnt
        }=this.state;
        return(
<div>
<h5>Sometimes it take around 10s to get reply from Web Api for first time later it work well</h5>
    <button type="button"
    className="btn btn-primary m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Add Product
    </button>
    <table className="table table-striped">
    <thead>
    <tr>
        <th>
            ProductId
        </th>
        <th>
            Name
        </th>
        <th>
           Description
        </th>
        <th>
            Price
        </th>
        <th>
            Quantity
        </th>
        <th>
            Category Name
        </th>
        <th>
            Options
        </th>
    </tr>
    </thead>
    <tbody>
        {products.map(prod=>
            <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>{prod.name}</td>
                <td>{prod.desc}</td>
                <td>{prod.price.toFixed(2)}zł</td>
                <td>{prod.qnt}</td>
                <td>{categories.map((cat)=>
                    cat.id === prod.categoryId ? cat.name : null)}
                </td>
                <td>
                    <button type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={()=>this.editClick(prod)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                    </button>
                    <button type="button"
                    className="btn btn-light mr-1"
                    onClick={()=>this.deleteClick(prod.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>
                    </button>
                </td>
            </tr>
            )}
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
        <div className="input-group mb-3">
            <span className="input-group-text">Product Name</span>
            <input type="text" className="form-control"
            value={name}
            onChange={this.changeProductName}/>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text">Description</span>
            <input type="text" className="form-control"
            value={desc}
            onChange={this.changeDescription}/>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text">Price</span>
            <input type="number" className="form-control"
            value={price}
            onChange={this.changePrice}/>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text">Quantity</span>
            <input type="number" className="form-control"
            value={qnt}
            onChange={this.changeQnt}/>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text">Category</span>
            <select className="form-select"
            onChange={this.changeCategory}
            value={categoryId}>
                <option></option>
                {categories.map(cat=><option key={cat.id} value={cat.id}>
                    {cat.name}
                </option>)}
            </select>
        </div>
        {id===0?
        <button type="button"  
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}>
        Create</button>:null}
        {id!==0?
        <button type="button"  
        className="btn btn-primary float-start"
        onClick={()=>this.updateClick()}>
        Update</button>:null}
    </div>
</div>
</div>
</div>


</div>
        )
    }
}