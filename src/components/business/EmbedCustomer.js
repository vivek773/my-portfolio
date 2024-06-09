import React, { useRef } from "react";
import BusinessCardComponent from "./BusinessCardComponent";
import { Box, Typography } from "@mui/material";
import CustomButton from "../../forms/button/CustomButton";
import { useToast } from "../../context/ToastContext";
import { useSelector } from "react-redux";

export default function EmbedCustomerAppCard() {
  const iframeCodeRef = useRef(null);
  const { setToast } = useToast();
  const tenantId = useSelector((state) => state.auth.tenant_id);

  const copyIframeCode = () => {
    const iframeCode = iframeCodeRef.current.innerText;
    navigator.clipboard
      .writeText(iframeCode)
      .then(() =>
        setToast({
          open: true,
          message: "Copied to clipboard",
          severity: "success",
        })
      )
      .catch((error) => console.error("Error copying text: ", error));
  };

  return (
    <BusinessCardComponent
      title={"Customer App Embed Code"}
      component={
        <>
          <Typography variant="subtitle1" pb={2}>
            Use the following code to embed the customer app in your website.
          </Typography>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems="center"
          >
            <Typography
              variant="body2"
              ref={iframeCodeRef}
              sx={{
                fontFamily: "monospace",
                backgroundColor: "#f5f5f5",
                padding: "10px",
                borderRadius: "5px",
                width: "90%",
                border: "1px solid #ddd",
                display: "inline-block",
              }}
            >
              {`<iframe src="https://customer.edispatched135.com/?eDispatched_account_id=${tenantId}" title="Embedded React App"></iframe>`}
            </Typography>
            <Box>
              <CustomButton
                label={"Copy"}
                size={"small"}
                bgColor={"#479DE1"}
                onClick={copyIframeCode}
              />
            </Box>
          </Box>
        </>
      }
    />
  );
}
