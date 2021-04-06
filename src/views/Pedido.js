import React,{useContext,useState} from 'react';
import {Row,Col,Button,Form,Input,Radio} from 'antd'
import GoBack from '../Components/GoBack';
import Carrinho from '../Components/Carrinho';
import {MenuContext} from '../contexts/ThemeContext';

const Pedido = () => {

    const [form] = Form.useForm();
    const [pagamento,setPagamento] = useState("");
    const [tipo,setTipo] = useState("");
    const myState=useContext(MenuContext);
    const finishOrder=() => {
        form.validateFields()
        .then(values => {
            form.resetFields();
            values.carrinho=myState.state.carrinho;
            console.log(values);
        })
        .catch(info => {
            console.log(info);
        });
    }
    
    return(
        <>
            <GoBack name='Meu pedido'/>

            {myState.state.carrinho.length>0?<Carrinho/>:<p>Seu carrinho está vazio no momento, adicione algum produto!</p>}
           
            <div style={{padding:'10px'}}>
                <Form
                form={form}
                labelCol={{span:8}}
                layout="vertical"
                name="pedidoForm">
                    
                    <Form.Item
                    name="name"
                    label="Informe seu nome"
                    rules={[{ required: true, message: 'Por favor, nos diga seu nome' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                    name="numero"
                    label="Digite o número do seu celular (9 digitos)"
                    rules={[{required:true,message:"Informe seu número do WhatsApp para contato com a loja"}]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                    name="tipo"
                    label="Tipo de pedido"
                    rules={[{required:true,message:"Especifique o método de aquisição dos produtos"}]}>
                        <Radio.Group onChange={(e)=>setTipo(e.target.value)} 
                        value={tipo} 
                        style={{display:'flex',justifyContent:'center',marginBottom:15}}>
                            <Radio className='radio' value={"entrega"}>Entrega à domicílio <br/>(sujeito a taxas adicionais)</Radio>
                            <Radio className='radio' value={"local"}>Retirada no local</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                    name="pagamento"
                    label="Forma de pagamento"
                    rules={[{required:true,message:"Informe o método de pagamento"}]}>
                        <Radio.Group onChange={(e)=>setPagamento(e.target.value)} 
                        value={pagamento} 
                        style={{display:'flex',justifyContent:'center',marginBottom:15}}>
                            <Radio className='radio' value={"dinheiro"}>Dinheiro</Radio>
                            <Radio className='radio' value={"debito"}>Débito</Radio>
                            <Radio className='radio' value={"credito"}>Crédito</Radio>
                        </Radio.Group>
                    </Form.Item>

                    {pagamento==="dinheiro"?
                    <Form.Item
                    name="troco"
                    label="Troco para">
                        <Input type='number' />
                    </Form.Item>:null}                
                </Form>

                <Row justify='center'>
                    <Col>
                        <Button onClick={()=>finishOrder()} size='large' style={{backgroundColor:"#47b3f7",color:"white"}}>Finalizar pedido</Button>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Pedido;