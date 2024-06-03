import React, { useRef } from 'react'
import BusinessCardComponent from './BusinessCardComponent'
import { Box, Typography } from '@mui/material'
import CustomButton from '../../forms/button/CustomButton'
import { useToast } from '../../context/ToastContext';

export default function EmbedCustomer() {
    const iframeCodeRef = useRef(null);
    const { setToast } = useToast();

    const copyIframeCode = () => {
        const iframeCode = iframeCodeRef.current.innerText;
        navigator.clipboard.writeText(iframeCode)
            .then(() => 
                setToast({
                    open: true,
                    message: 'Copied to clipboard',
                    severity: "success",
                  }))
            .catch((error) => console.error('Error copying text: ', error));
    };
    return (
        <BusinessCardComponent
            title={"Embed Customer App"}
            component={
                <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography variant="body2" ref={iframeCodeRef}>
                        {' <iframe src=https://demo-customer.edispatched135.com/?${tenant_id} title="Embedded Customer App"></iframe>'}
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
            }
        />

    )
}
