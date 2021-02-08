import React from 'react';
import { Modal, Form,Input} from 'antd';

const NewGroupModal = ({
  visible,
  onOk,
  onCancel,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title='Criar novo grupo'
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
            layout="vertical"
            name="form_in_modal"
        >
            <Form.Item
            name="nome"
            label="Nome do grupo"
            rules={[{ required: true, message: 'Por favor insira o nome do novo grupo.' }]}
            >
                <Input />
            </Form.Item>
        </Form>
    </Modal>
  );
};

export default NewGroupModal;