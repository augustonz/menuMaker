import React,{useState} from 'react';
import { Modal, Form,Input,Radio,Button,Space} from 'antd';
import {DeleteOutlined,PlusOutlined} from '@ant-design/icons';

const {TextArea} = Input;

const NewProductModal = ({
  visible,
  onOk,
  onCancel
}) => {

  const [priceType,setPriceType] = useState(1);
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title='Criar novo produto'
      okText='Criar'
      cancelText='Cancelar'
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onOk(values);
          })
          .catch(info => {
          });
      }}
    >
        <Form
            form={form}
            labelCol={{span:8}}
            layout="vertical"
            name="form_in_modal"
        >
            <Form.Item
            name="nome"
            label="Nome do produto"
            rules={[{ required: true, message: 'Por favor insira o nome do novo produto.' }]}
            >
                <Input />
            </Form.Item>
            
            <Form.Item
            name="descricao"
            label="Descrição"
            >
                <TextArea rows='3'/>
            </Form.Item>
            <p>Preço</p>
            <Radio.Group onChange={(e)=>{
                setPriceType(e.target.value);
            }} value={priceType} style={{display:'flex',justifyContent:'center',marginBottom:15}}>
                <Radio className='radio' value={1}>
                Preço único
                </Radio>
                <Radio className='radio' value={2}>
                Preço customizado
                </Radio>
            </Radio.Group>
            {priceType===1?
                <>
                    <Form.Item name='price'
                    rules={[{ required: true, message: 'Informe o preço do produto.' }]} >
                        <Input  placeholder='R$0,00' type='number' style={{width:'50%',marginLeft:'23%'}}/>
                    </Form.Item>
                </>
                :
                <>
                    <Form.List name="prices">
                        {(fields, { add, remove }) => (
                        <>
                            {fields.map(field => (
                                <Space key={field.key} style={{  marginBottom: 8 }} align="baseline">
                                    <Form.Item
                                    wrapperCol={{offset:12}}
                                    {...field}
                                    name={[field.name, 'info']}
                                    fieldKey={[field.fieldKey, 'info']}
                                    rules={[{ required: true, message: 'Inisra o título' }]}
                                    >
                                        <Input style={{width:'200%'}} placeholder="Título" />
                                    </Form.Item>

                                    <Form.Item
                                    wrapperCol={{offset:12}}
                                    {...field}
                                    name={[field.name, 'val']}
                                    fieldKey={[field.fieldKey, 'val']}
                                    rules={[{ required: true, message: 'Informe o preço' }]}
                                    >
                                        <Input placeholder="R$0.00" type='number' />
                                    </Form.Item>
                                    <Button size='small' shape='circle' danger onClick={()=>remove(field.name) } icon={<DeleteOutlined />}/>
                                </Space>
                            ))}
                            <Form.Item>
                                <Button style={{width:'70%',marginLeft:'15%'}}type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Adidionar opção
                                </Button>
                            </Form.Item>
                        </>
                        )}
                    </Form.List>
                </>
            }
            
        </Form>
    </Modal>
  );
};

export default NewProductModal;