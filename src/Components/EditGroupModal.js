import React from 'react';
import { Modal, Form,Input} from 'antd';

const EditGroupModal = ({
  visible,
  onOk,
  onCancel,
  initialName
}) => {
  const [form] = Form.useForm();

  form.setFieldsValue({nome:initialName});

  return (
    <Modal
      visible={visible}
      title='Editar grupo'
      okText='Confirmar'
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
            layout="vertical"
            name="form_in_modal"
        >
            <Form.Item
            name="nome"
            label="Nome do grupo"
            rules={[{ required: true, message: 'Por favor insira o nome do grupo.' }]}
            >
                <Input />
            </Form.Item>
            {/*
            <Form.Item name="description" label="Description">
                <Input type="textarea" />
            </Form.Item>
            
            <Form.Item name="modifier">
                <Radio.Group>
                    <Radio value="public">Public</Radio>
                    <Radio value="private">Private</Radio>
                </Radio.Group>
            </Form.Item>*/}
        </Form>
    </Modal>
  );
};

export default EditGroupModal;