import React from 'react';
import { Modal, Form,Input} from 'antd';

const EditGroupModal = ({
  visible,
  onOk,
  onCancel,
  initialValues
}) => {
  const [form] = Form.useForm();

  form.setFieldsValue({name:initialValues.name});

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
            values._id=initialValues._id;
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
            name="name"
            label="Nome do grupo"
            rules={[{ required: true, message: 'Por favor insira o nome do grupo.' }]}
            >
                <Input />
            </Form.Item>
        </Form>
    </Modal>
  );
};

export default EditGroupModal;