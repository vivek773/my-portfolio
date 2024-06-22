import { Modal, Box, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ImageModal = ({ imageUrl, setImageUrl }) => {
  const handleClose = () => setImageUrl(null);

  return (
    <Modal open={imageUrl} onClose={handleClose}>
      <Box sx={style}>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Image not found"
            style={{ width: "100%", marginTop: "20px" }}
          />
        )}
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: 0, right: 0 }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </Modal>
  );
};

export default ImageModal;
