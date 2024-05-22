import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

// MUI components
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const CustomFileInput = ({ label, setFieldValue, name }) => {
  const [selectedFileName, setSelectedFileName] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setFieldValue(name, file);
      setSelectedFileName(file.name);
    },
    [setFieldValue, name]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
      <Typography paragraph fontWeight={700}>
        {label}
      </Typography>
      <Box
        {...getRootProps()}
        sx={{
          border: "2px dashed grey",
          borderRadius: 1,
          padding: 2,
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        {selectedFileName && (
          <Typography variant="body2" color="textSecondary">
            Selected file: {selectedFileName}
          </Typography>
        )}
      </Box>
    </>
  );
};

export default CustomFileInput;
