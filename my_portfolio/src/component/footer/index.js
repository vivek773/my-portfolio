// Footer component

//MUI components
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

// Utils
import { SOCIAL_MEDIA, CONFIG, DATE } from '../../utils/constant';

const Footer = () => {

    return (
    <Box className="footer">
      <Box className="footer-socialMedia">
        <div className="footer-border"></div>
        <div className="footer-icons">{SOCIAL_MEDIA.map((item) => <IconButton key={item.id} onClick={() => window.open(item.link, '_blank')}>{item.icon}</IconButton>)}</div>
        <div className="footer-border"></div>
      </Box>
      <Typography className="footer-text">Copyright © {DATE.currentYear} {CONFIG.username}. All rights reserved.</Typography>
    </Box>
  )
}

export default Footer;