import React, { useEffect,useContext,useState } from 'react';
import SideMenu from '../Components/SideMenu';
import {Row,Col,Tabs,Form,Button,Input,Spin,TimePicker,Select} from 'antd';
import {MenuContext} from '../contexts/ThemeContext';
import moment from 'moment';

const {TabPane} = Tabs;
const {Option} = Select
const Perfil = () => {

    const [form1]=Form.useForm();
    const [loading,setLoading] = useState(true);
    const [initHora,setInitHora] = useState(0);
    const [endHora,setEndHora] = useState(0);
    const [initDay,setInitDay] = useState('Seg');
    const [endDay,setEndDay] = useState('Sex');
    const myContext=useContext(MenuContext);

    const sendForm1 = async(values) => {
        setLoading(true);
        await myContext.updateLojaInfo(values);
        refreshLojaInfo();
    }

    const sendForm2 = async() => {
        setLoading(true);
        await myContext.updateLojaHorario([initDay,endDay,initHora,endHora]);
        refreshLojaInfo();
    }
    
    const refreshLojaInfo = async()=>{
        setLoading(true);
        const info = await myContext.getLojaInfo();
        form1.setFieldsValue({
            nome:info.nome,
            endereco:info.endereco,
            sobre:info.sobre
        })
        setInitDay(info.horario[0]);
        setEndDay(info.horario[1]);
        
        setInitHora(moment(info.horario[2]));
        setEndHora(moment(info.horario[3]));
        setLoading(false);
    }

    useEffect(()=>{
        async function init() {
            await refreshLojaInfo();
        }
        init();
    },[])

    return(
        <SideMenu name='loja'>
            {loading? <div style={{backgroundColor:'white',width:'100%',textAlign:'center',height:'100%',padding:'35vh 0'}}><Spin size='large'/></div>:
            <Tabs type="card">
                <TabPane tab="Informações" key="1">
                    <Form form={form1} onFinish={sendForm1} name='lojaInfo' layout='vertical'>
                        <Row>
                            <Col span='11'>
                                <Form.Item name='nome' label='Nome'>
                                    <Input/>
                                </Form.Item>
                            </Col>
                            <Col offset='2' span='11'>
                                <Form.Item name='endereco' label='Endereço'>
                                    <Input/>
                                </Form.Item>
                            </Col>
                        </Row>
                        
                        
                        <Form.Item name='sobre' label='Sobre a loja'>
                            <Input.TextArea autoSize={true} />
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' htmlType='submit'>
                                Salvar
                            </Button>
                        </Form.Item>
                    </Form>
                </TabPane>
                <TabPane tab="Horários" key="2">
                    <h2>Horário de funcionamento da loja</h2>
                    <Row justify='center' style={{padding:'20px 0px'}}>
                        <Col>
                            <p style={{display:'inline'}}>De </p>
                            <Select onChange={setInitDay} value={initDay} showArrow={false} style={{width:'60px'}}>
                                <Option value='Seg'>Seg</Option>
                                <Option value='Ter'>Ter</Option>
                                <Option value='Qua'>Qua</Option>
                                <Option value='Qui'>Qui</Option>
                                <Option value='Sex'>Sex</Option>
                                <Option value='Sab'>Sáb</Option>
                                <Option value='Dom'>Dom</Option>
                            </Select>
                            <p style={{display:'inline'}}> a </p>
                            <Select onChange={setEndDay} value={endDay} showArrow={false} style={{width:'60px'}}>
                                <Option value='Seg'>Seg</Option>
                                <Option value='Ter'>Ter</Option>
                                <Option value='Qua'>Qua</Option>
                                <Option value='Qui'>Qui</Option>
                                <Option value='Sex'>Sex</Option>
                                <Option value='Sab'>Sáb</Option>
                                <Option value='Dom'>Dom</Option>
                            </Select>
                        </Col>
                        <Col>
                            <p style={{display:'inline'}}> , das </p>
                            <TimePicker style={{width:'80px'}} onSelect={setInitHora} value={initHora} showNow={false} placeholder='00:00' minuteStep={5} format='HH:mm'/>
                            <p style={{display:'inline'}}> às </p>
                            <TimePicker style={{width:'80px'}} onSelect={setEndHora} value={endHora} showNow={false} placeholder='00:00' minuteStep={5} format='HH:mm'/>
                        </Col>
                    </Row> 
                    <Button type='primary' onClick={sendForm2}>
                        Salvar
                    </Button>
                   
                </TabPane>
            </Tabs>}
        </SideMenu> 
    )

}
export default Perfil;