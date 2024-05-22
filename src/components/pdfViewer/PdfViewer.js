// PDF viewer
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";


// MUI components
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfViewer = ({ fileUrl, setFileUrl }) => {
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <Modal open={!!fileUrl} onClose={() => setFileUrl("")} size="small">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "45%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          overflow: "auto",
          maxHeight: "90vh",
          textAlign: "center",
        }}
      >
        <IconButton
          onClick={() => setFileUrl("")}
          sx={{ position: "absolute", top: 0, right: 0 }}
        >
          <CloseIcon />
        </IconButton>

        <Typography id="pdf-viewer-modal-title" variant="h6" component="h2">
          PDF Viewer
        </Typography>
        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<Typography>Loading...</Typography>}
        >
          {Array.from(new Array(numPages || 0), (el, index) => (
            <Card key={`page_${index + 1}`} style={{ margin: "10px" }}>
              <CardContent
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Page {index + 1}
                </Typography>
                <Page
                  pageNumber={index + 1}
                  width={600}
                  className="pdf-page"
                  loading={<Typography>Loading...</Typography>}
                />
              </CardContent>
            </Card>
          ))}
        </Document>
      </Box>
    </Modal>
  );
};

export default PdfViewer;
