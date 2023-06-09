import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";
import DeleteType from "../components/modals/DeleteType";
import DeleteBrand from "../components/modals/DeleteBrand";
import CreateDiscount from "../components/modals/CreateDiscount";
import DiscountModal from "../components/modals/CreateDiscount";
import DeleteDiscountModal from "../components/modals/DeleteDiscout";
import DeleteDeviceModal from "../components/modals/DeleteDevice";
const Admin = () => {
  const [brandVisible, setBrandVisible] = useState(false);
  const [brandDeleteVisible, setBrandDeleteVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [typeDeleteVisible, setDeleteTypeVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);
  const [discountVisible, setDiscountVisible] = useState(false);
  const [openDiscountModal, setOpenDiscountModal] = useState(false);
  const [openDeleteDiscountModal, setDeleteOpenDiscountModal] = useState(false);
  const [openDeleteDeviceModal, setOpenDeleteDeviceModal] = useState(false);
  return (
    <Container className="d-flex flex-column">
      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => setBrandVisible(true)}
      >
        Добавить бренд
      </Button>
      <Button
        variant={"outline-danger"}
        className="mt-4 p-2"
        onClick={() => setBrandDeleteVisible(true)}
      >
        Удалить бренд
      </Button>
      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => setTypeVisible(true)}
      >
        Добавить тип
      </Button>
      <Button
        variant={"outline-danger"}
        className="mt-4 p-2"
        onClick={() => setDeleteTypeVisible(true)}
      >
        Удалить тип
      </Button>

      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => setDeviceVisible(true)}
      >
        Добавить товар
      </Button>
      <Button
        variant={"outline-danger"}
        className="mt-4 p-2"
        onClick={() => setOpenDeleteDeviceModal(true)}
      >
        Удалить товар
      </Button>
      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => setOpenDiscountModal(true)}
      >
        Добавить скидку на товар
      </Button>
      <Button
        variant={"outline-danger"}
        className="mt-4 p-2"
        onClick={() => setDeleteOpenDiscountModal(true)}
      >
        Удалить скидку
      </Button>
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <CreateDevice
        show={deviceVisible}
        onHide={() => setDeviceVisible(false)}
      />
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
      <DeleteType
        show={typeDeleteVisible}
        onHide={() => setDeleteTypeVisible(false)}
      />
      <DeleteBrand
        show={brandDeleteVisible}
        onHide={() => setBrandDeleteVisible(false)}
      />
      <CreateDiscount
        show={discountVisible}
        onHide={() => setDiscountVisible(true)}
      />
      <DiscountModal
        open={openDiscountModal}
        onClose={() => setOpenDiscountModal(false)}
      />
      <DeleteDiscountModal
        open={openDeleteDiscountModal}
        onClose={() => setDeleteOpenDiscountModal(false)}
      />
      <DeleteDeviceModal
        open={openDeleteDeviceModal}
        onClose={() => setOpenDeleteDeviceModal(false)}
      />
    </Container>
  );
};

export default Admin;
