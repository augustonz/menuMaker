import React ,{createContext,Component} from 'react';
import axios from 'axios';
export const MenuContext = createContext();

class MenuContextProvider extends Component{
    state = {
        collapsed:false,
        //http://localhost:4000/
        //https://augustomenumaker.herokuapp.com/
        url:"https://augustomenumaker.herokuapp.com/",
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

    updateCollapseHandler = (state)=>{
        this.setState({collapsed:state});
        this.storeStateLocal();
    }

    getMenuHandler = async() => {
        const response = await axios.get(`${this.state.url}grupo`);
        var grupos=response.data;
    
        for (var grupo=0;grupo<grupos.length;grupo++){
            const response= await axios.get(`${this.state.url}grupo/${grupos[grupo]._id}/produtos`);
            grupos[grupo].products=response.data;
        }
        return grupos;   
    }

    getOpcoesHandler= async() =>{
        const response= await axios.get(`${this.state.url}opcao/`);
        return response.data;
    }

    getProdutoHandler = async(id) => {
        const response = await axios.get(`${this.state.url}produto/`+id);
        return response.data;
    }

    createGroupHandler = async(values) => {
        await axios.post(`${this.state.url}grupo/add`,values)
        .catch(error=>alert("Erro na conexão, tente novamente."));
    }

    editGroupHandler = async(values) => {
        await axios.post(`${this.state.url}grupo/update/${values._id}`,values)
        .catch(error=>alert("Erro na conexão, tente novamente."));
    }

    deleteGroupHandler = async(id)=>{
        await axios.delete(`${this.state.url}grupo/${id}`)
        .catch(error=>alert("Erro na conexão, tente novamente."));
    }
    
    createProductHandler = async(values) => {
        await axios.post(`${this.state.url}produto/add`,values)
        .catch(error=>alert("Erro na conexão, tente novamente."));

    }

    editProductHandler = async(values) =>{
        await axios.post(`${this.state.url}produto/update/${values._id}`,values)
        .catch(error=>alert("Erro na conexão, tente novamente."));
    }

    delProductHandler = async (grupo,id) => {
        await axios.delete(`${this.state.url}produto/${id}`)
        .catch(error=>alert("Erro na conexão, tente novamente."));
    }

    createOptionHandler = async(option) => {
        await axios.post(`${this.state.url}opcao/add`,option)
        .catch(error=>alert("Erro na conexão, tente novamente."));
    }

    editOptionHandler = async(option)=>{
        await axios.post(`${this.state.url}opcao/update/${option._id}`,option)
        .catch(error=>alert("Erro na conexão, tente novamente."));
    }

    delOptionHandler = async(id)=>{
        await axios.delete(`${this.state.url}opcao/${id}`)
        .catch(error=>alert("Erro na conexão, tente novamente."));
    }

    getLojaInfoHandler = async() => {
        const response = await axios.get(`${this.state.url}loja`);
        return response.data[0];
    }

    updateLojaInfoHandler = async(info) => {
        await axios.post(`${this.state.url}loja/info`,info)
        .catch(error=>alert("Erro na conexão, tente novamente."));
    }

    updateLojaHorarioHandler = async(horario) => {
        await axios.post(`${this.state.url}loja/horario`,horario)
        .catch(error=>alert("Erro na conexão, tente novamente."));
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
            createGroup:this.createGroupHandler,
            editGroup:this.editGroupHandler,
            deleteGroup:this.deleteGroupHandler,
            createProduct:this.createProductHandler,
            editProduct:this.editProductHandler,
            delProduct:this.delProductHandler,
            createOption:this.createOptionHandler,
            editOption:this.editOptionHandler,
            delOption:this.delOptionHandler,
            findProductById:this.findProductByIdHandler,
            findOptionsById:this.findOptionsByIdHandler,
            getOpcoesIds:this.getOpcoesIdsHandler,
            getOpcoes:this.getOpcoesHandler,
            addProdutoCarrinho:this.addProdutoCarrinhoHandler,
            removeProdutoCarrinho:this.removeProdutoCarrinhoHandler,
            getMenu:this.getMenuHandler,
            getProduto:this.getProdutoHandler,
            getLojaInfo:this.getLojaInfoHandler,
            updateLojaInfo:this.updateLojaInfoHandler,
            updateLojaHorario:this.updateLojaHorarioHandler}}>
                {this.props.children}
            </MenuContext.Provider>
        );
    }
}

export default MenuContextProvider;