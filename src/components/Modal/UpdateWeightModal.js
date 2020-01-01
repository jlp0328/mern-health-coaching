import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export default function UpdateWeightModal({ open, weight }) {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(open);

  useEffect(() => {
      
    setOpenModal(open);
  }, [open]);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    open = false;
    setOpenModal(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={openModal}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Update Weight</h2>
            <p id="transition-modal-description">
              Do you want to update your weight for X date?
            </p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
