// Icon component

// Default
import { Icon } from '@iconify/react';

// MUI component
import { Box } from '@mui/material';

const CustomIcon = ({ icon, width, height, color, sx }) => {
  return (
    <Box component={Icon} icon={icon} sx={{ width, height, color, ...sx }} />
  )
}

export default CustomIcon;

