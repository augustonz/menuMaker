import React,{useEffect} from 'react';
import { Modal, Form,Input,Button,Checkbox,Space,Row,Col} from 'antd';
import {DeleteOutlined,PlusOutlined} from '@ant-design/icons'

const EditOptionModal = ({
  initialValues,
  visible,
  onOk,
  onCancel,
}) => {
    
    const [form] = Form.useForm();

    const setInitialValuesForm = () => {
        form.setFieldsValue({title:initialValues.title});
        form.setFieldsValue({req:initialValues.req});
        form.setFieldsValue({max:initialValues.max});
        form.setFieldsValue({possibil:initialValues.possibil});
    }
    useEffect(()=>{
        if (visible){
            setInitialValuesForm();
        }
    },[visible]);

  return (
    <Modal
      visible={visible}
      title='Editar opções'
      okText='Editar'
      cancelText='Cancelar'
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
              values._id=initialValues._id;
              for (var i in values.possibil){
                  values.possibil[i].add=Number(values.possibil[i].add);
              }
            form.resetFields();
            onOk(values);
          })
          .catch(info => {
          });
      }}
    >
        <Form
            form={form}
            layout="vertical"
            name="form_in_modal"
        >
            <Form.Item
            name="title"
            label="Título das opções"
            rules={[{ required: true, message: 'Por favor insira o título' }]}
            >
                <Input />
            </Form.Item>

            <Row justify='start' align='bottom'>
                <Col>
                    <Form.Item
                    initialValue='1'
                    name="max"
                    label="Número máximo de opções selecionadas"
                    rules={[{ required: true, message: 'Insira o limite de opções selecionadas' }]}
                    >
                        <Input type='number' />
                    </Form.Item>
                </Col>
                <Col offset='2'>
                    <Form.Item name="req" valuePropName="checked">
                        <Checkbox>Opção obrigatória</Checkbox>
                    </Form.Item>
                </Col>
            </Row>

            <Form.List name="possibil">
                {(fields, { add, remove }) => (
                <>
                    {fields.map(field => (
                        <Space key={field.key} style={{  marginBottom: 8 }} align="baseline">
                            <Form.Item
                            wrapperCol={{offset:12}}
                            {...field}
                            name={[field.name, 'name']}
                            fieldKey={[field.fieldKey, 'name']}
                            rules={[{ required: true, message: 'Inisra o nome' }]}
                            >
                                <Input style={{width:'200%'}} placeholder="Nome" />
                            </Form.Item>

                            <Form.Item
                            wrapperCol={{offset:12}}
                            {...field}
                            name={[field.name, 'add']}
                            fieldKey={[field.fieldKey, 'add']}
                            rules={[{ required: true, message: 'Informe o valor adicional' }]}
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
        </Form>
    </Modal>
  );
};

export default EditOptionModal;