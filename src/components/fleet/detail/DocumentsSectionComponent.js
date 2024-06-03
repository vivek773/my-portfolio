// Document section

// Default
import { useState, useEffect } from "react";

// MUI components
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// Custom
import FleetDetailCardComponent from "./FleetDetailCardComponent";
import DocumentsSectionModal from "./detailModal/DocumentsSectionModal";
import SpinnerComponent from "../../../components/spinner/SpinnerComponent";
import PdfViewer from "../../pdfViewer/PdfViewer";

// Redux
import { useSelector } from "react-redux";

// Context
import { useModal } from "../../../context/ModalContext";
import { useLoader } from "../../../context/LoaderContext";

// Utils
import { DOCUMENTS_TYPES } from "../../../utils/Constants";
import { pdfDownloadRequest } from "../../../utils/Services";

const DocumentsSectionComponent = () => {
  const fleet = useSelector((state) => state.fleet);
  const { openModal } = useModal();

  const { isLoading, startLoading, stopLoading } = useLoader();

  const [documentModal, setDocumentModal] = useState("");
  const [document, setDocument] = useState([])
  const [fileUrl, setFileUrl] = useState("");

  useEffect(() => {
    const itemArr = [
      {
        key: DOCUMENTS_TYPES[0],
        label: "Pilot Operating Handbook",
        value: fleet?.details?.documents?.[DOCUMENTS_TYPES[0]],
      },
      {
        key: DOCUMENTS_TYPES[1],
        label: "Checklist",
        value: fleet?.details?.documents?.[DOCUMENTS_TYPES[1]],
      },
      {
        key: DOCUMENTS_TYPES[2],
        label: "Weight and Balance",
        value: fleet?.details?.documents?.[DOCUMENTS_TYPES[2]],
      },
      {
        key: DOCUMENTS_TYPES[3],
        label: "Airworthiness Certificate",
        value: fleet?.details?.documents?.[DOCUMENTS_TYPES[3]],
      },
      {
        key: DOCUMENTS_TYPES[4],
        label: "Registration",
        value: fleet?.details?.documents?.[DOCUMENTS_TYPES[4]],
      },
      {
        key: DOCUMENTS_TYPES[5],
        label: "Insurance",
        value: fleet?.details?.documents?.[DOCUMENTS_TYPES[5]],
      },
    ];

    setDocument([...itemArr])

  },[fleet])


  const downloadDocuments = async (payload) => {
    startLoading();
    const response = await pdfDownloadRequest(
      `/document/owner/fleet/download-fleet-document/${fleet?.tail_number}/${payload}`,
      {}
    );

    if (response) {
      const blob = new Blob([response], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `${payload}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      stopLoading();
    } else {
      stopLoading();
    }
  };

  const viewPDF = async (payload) => {
    startLoading();
    const response = await pdfDownloadRequest(
      `/document/owner/fleet/download-fleet-document/${fleet?.tail_number}/${payload}`,
      {}
    );
    if (response) {
      const file = new Blob([response], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);
      setFileUrl(fileURL);

      stopLoading();
    } else {
      stopLoading();
    }
  };

  return (
    <>
      <FleetDetailCardComponent
        title="Documents"
        component={
          <Grid
            container
            spacing={{ xs: 5, md: 2 }}
            columns={{ md: 12 }}
            style={{ position: "relative" }}
          >
            {/* <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1,
              }}
            >
              <SpinnerComponent show={isLoading} size={30}/>
            </Box> */}
            {document?.map((item, index) => (
              <Grid
                item
                key={index}
                xs={6}
                // sx={{ opacity: isLoading ? 0.5 : 1 }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  margin="0px 10px"
                >
                  <Typography variant="subtitle1" noWrap>
                    {item.label}
                  </Typography>
                  <Box
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    {item.value && (
                      <IconButton
                        color="primary"
                        onClick={() => viewPDF(item.key)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    )}
                    {item.value && (
                      <IconButton
                        color="primary"
                        onClick={() => downloadDocuments(item.key)}
                      >
                        <DownloadIcon />
                      </IconButton>
                    )}
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                      onClick={() => {
                        setDocumentModal(item.label);
                        openModal("Documents");
                      }}
                    >
                      <CloudUploadIcon />
                    </IconButton>
                  </Box>
                </Stack>
              </Grid>
            ))}
          </Grid>
        }
      />
      <DocumentsSectionModal documentModal={documentModal} document={document} setDocument={setDocument}/>
      {fileUrl && <PdfViewer fileUrl={fileUrl} setFileUrl={setFileUrl}/>}
    </>
  );
};

export default DocumentsSectionComponent;
