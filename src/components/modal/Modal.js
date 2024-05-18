// Modal

// MUI components
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

// Context
import { useModal } from "../../context/ModalContext";

const Modal = ({ title, open, content, action }) => {
  const { closeModal } = useModal()

  return (
    <Dialog onClose={closeModal} open={open} maxWidth="sm" fullWidth={true}>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {title}
        <IconButton
          aria-label="close"
          onClick={closeModal}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>{content}</DialogContent>
      <DialogActions sx={{ padding: "20px"}}>{action}</DialogActions>
    </Dialog>
  );
};
export default Modal;
