import React, { useState } from "react";
import { Button } from "@mui/material";
import DiscountModal from "../components/modals/CreateDiscount";
const Discoun = () => {
  const [openDiscountModal, setOpenDiscountModal] = useState(false);
  const handleOpen = () => {
    setOpenDiscountModal(true);
  };
  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Открыть
      </Button>
      <DiscountModal
        open={openDiscountModal}
        onClose={() => setOpenDiscountModal(false)}
      />
    </>
  );
};

export default Discoun;
