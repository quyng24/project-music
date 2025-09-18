import { Modal } from "antd";

const BaseModal = ({
  open,
  onOk,
  onCancel,
  title = "Thông báo",
  children,
  width = 600,
  okText = "Xác nhận",
  cancelText = "Hủy",
  footer = null,
  destroyOnHidden = true,
}) => {
  return (
    <Modal
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      title={title}
      width={width}
      okText={okText}
      cancelText={cancelText}
      footer={footer}
      destroyOnHidden={destroyOnHidden}
    >
      {children}
    </Modal>
  );
};

export default BaseModal;
