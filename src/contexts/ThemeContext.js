import React ,{createContext,Component} from 'react';

export const MenuContext = createContext();

class MenuContextProvider extends Component{
    state = {
        collapsed:false,
        carrinho: [],
        groupId:3,
        productId:3,
        optionsId:3,
        carrinhoId:1,
        storeInfo:{address:'',description:'',name:'',storeCode:'',hellomessage:'',openTime:''},
        cardapio:{grupos:[{id:1,name:'Açaís',products:[
            {id:1,name:'Produto 1',desc:'Descrição',imgSrc:'/placeholder.png',prices:[{info:'Preço: ',val:10.50}],options:[1]}
        ,{id:2,name:'Produto 2',desc:'Descrição',imgSrc:'/placeholder.png',prices:[{info:'Preço: ',val:10.00}]}],options:[2]}
        ,{id:2,name:'Milkshakes',products:[]}],options:[{id:1,title:'Qual sabor?',req:false,max:10,possibil:[{name:'Morango',add:1.00},{name:'Chocolate',add:0.00}]},{id:2,title:'Adicionar queijo?',min:0,max:5,possibil:[{name:'sim',add:1.00},{name:'não',add:0.00}]}]}
    }

    componentWillMount = () => {
        if (JSON.parse(window.localStorage.getItem('state'))!==null){
            this.setState({cardapio:this.state.cardapio,
                carrinho:JSON.parse(window.localStorage.getItem('state')).carrinho,
                collapsed:JSON.parse(window.localStorage.getItem('state')).collapsed});
        }   
    }

    storeStateLocal = () =>{
        window.localStorage.setItem('state',JSON.stringify({carrinhoId:this.state.carrinhoId,carrinho:this.state.carrinho,collapsed:this.state.collapsed}));
    }

    storeStateDatabase = () => {

    }

    updateCollapseHandler = (state)=>{
        this.setState({collapsed:state});
        this.storeStateLocal();
    }

    newGroupHandler = (groupName) => {
        let group={id:this.state.groupId,name:groupName,products:[]}
        this.setState({
            groupId:this.state.groupId+1
        })
        let Grupos=this.state.cardapio.grupos;
        Grupos.unshift(group);
        this.setState({
            cardapio:{grupos:Grupos,options:this.state.cardapio.options}
        })
        this.storeStateDatabase();
    }

    editGroupHandler = (Id,groupName)=>{
        let newArr=this.state.cardapio.grupos;
        var index = newArr.map(x => {
            return x.id;
          }).indexOf(Id);
        newArr[index].name=groupName;
        this.setState({
            cardapio:{grupos:newArr,options:this.state.cardapio.options}
        })
        this.storeStateDatabase();
    }

    deleteGroupHandler = (Id)=>{
        let newArr=this.state.cardapio.grupos;
        var index = newArr.map(x => {
            return x.id;
          }).indexOf(Id);
        newArr.splice(index,1);
        this.setState({
            cardapio:{grupos:newArr,options:this.state.cardapio.options}
        })
        this.storeStateDatabase();
    }
    
    newProductHandler = (grupoId,produto) => {
        produto.id=this.state.productId;
        this.setState({
            productId:this.state.productId+1
        });
    
        let Grupos=this.state.cardapio.grupos;
        var indexGrupo = Grupos.map(x => {
            return x.id;
        }).indexOf(grupoId);
        Grupos[indexGrupo].products.unshift(produto);
        this.setState({
            cardapio:{grupos:Grupos,options:this.state.cardapio.options},
        })
        this.storeStateDatabase();
    }

    editProductHandler = (grupoId,produto) =>{
        let Grupos=this.state.cardapio.grupos;
        var indexGrupo = Grupos.map(x => {
            return x.id;
        }).indexOf(grupoId);

        var indexProduto = Grupos[indexGrupo].products.map(x => {
            return x.id;
        }).indexOf(produto.id);
        
        Grupos[indexGrupo].products[indexProduto]=produto;
        this.setState({
            cardapio:{grupos:Grupos,options:this.state.cardapio.options},
        })
        this.storeStateDatabase();
    }

    deleteProductHandler = (grupoId,Id) => {
        let Grupos=this.state.cardapio.grupos;
        var indexGrupo = Grupos.map(x => {
            return x.id;
        }).indexOf(grupoId);

        let newArr=this.state.cardapio.grupos[indexGrupo].products;
        var index = newArr.map(x => {
            return x.id;
        }).indexOf(Id);
        newArr.splice(index,1);

        Grupos[indexGrupo].products=newArr;
        this.setState({
            cardapio:{grupos:Grupos,options:this.state.cardapio.options},
        })
        this.storeStateDatabase();
    }

    newOptionHandler = (option) => {
        option.id=this.state.optionsId;
        this.setState({
            optionsId:this.state.optionsId+1
        })
        var Options=this.state.cardapio.options;
        Options.unshift(option);
        this.setState({
            cardapio:{grupos:this.state.cardapio.grupos,options:Options}
        })
        this.storeStateDatabase();
    }

    editOptionHandler = (option)=>{
        let newArr=this.state.cardapio.options;
        var index = newArr.map(x => {
            return x.id;
          }).indexOf(option.id);
        newArr[index]=option;
        this.setState({
            cardapio:{grupos:this.state.cardapio.grupos,options:newArr}
        })
        this.storeStateDatabase();
    }

    deleteOptionHandler = (Id)=>{
        let newArr=this.state.cardapio.options;
        var index = newArr.map(x => {
            return x.id;
          }).indexOf(Id);
        newArr.splice(index,1);
        this.setState({
            cardapio:{grupos:this.state.cardapio.grupos,options:newArr}
        })
        this.storeStateDatabase();
    }

    findOptionsByIdHandler = (Ids) => {
        var list=[];
        for (let i in Ids){
            var index = this.state.cardapio.options.map(x => {
                return x.id;
            }).indexOf(Ids[i]);
            if (index!==-1){
                list.push(this.state.cardapio.options[index]);
            }
        }
        return list;
    }

    findProductByIdHandler = (Id) => {
        return this.state.cardapio.grupos.map(x=>{
            const productId=x.products.map(p=>{
                return p.id
            }).indexOf(Id)
            
            let product=x.products[productId]
            if (productId>-1){
                
                return product
            }
        }).sort()[0]
    }

    getOpcoesIdsHandler = () => {

        var ids=this.state.cardapio.options.map((item)=>{
            return item.id
        })
        return ids;
    }

    addProdutoCarrinhoHandler = (unit) => {
        let newArr=this.state.carrinho;
        unit.id=this.state.carrinhoId;
        newArr.push(unit);
        this.setState({
            carrinhoId:this.state.carrinhoId+1,
            carrinho:newArr
        });
        this.storeStateLocal();
    }

    removeProdutoCarrinhoHandler = (id) => {
        let newArr=this.state.carrinho;
        var index = newArr.map(x => {
            return x.id;
          }).indexOf(id);
        newArr.splice(index,1);
        this.setState({
            carrinho:newArr
        });
        this.storeStateLocal();
    }

    render(){
        return(
            <MenuContext.Provider value={{state:this.state,
            updateCollapse:this.updateCollapseHandler,
            newGroup:this.newGroupHandler,
            editGroup:this.editGroupHandler,
            deleteGroup:this.deleteGroupHandler,
            newProduct:this.newProductHandler,
            editProduct:this.editProductHandler,
            delProduct:this.deleteProductHandler,
            newOption:this.newOptionHandler,
            editOption:this.editOptionHandler,
            delOption:this.deleteOptionHandler,
            findProductById:this.findProductByIdHandler,
            findOptionsById:this.findOptionsByIdHandler,
            getOpcoesIds:this.getOpcoesIdsHandler,
            addProdutoCarrinho:this.addProdutoCarrinhoHandler,
            removeProdutoCarrinho:this.removeProdutoCarrinhoHandler}}>
                {this.props.children}
            </MenuContext.Provider>
        );
    }
}

export default MenuContextProvider;