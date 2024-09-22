import * as React from "react"

const ContactIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      d="M33 8.25H13.5c-1.65 0-3 1.35-3 3v13.5a3 3 0 0 0 3 3H33c1.665 0 3-1.335 3-3v-13.5a3 3 0 0 0-3-3Zm0 16.5H13.5V13.755l9.75 4.995L33 13.755V24.75Zm-9.75-8.535L13.5 11.25H33l-9.75 4.965ZM7.5 24.75c0 .255.045.495.075.75H1.5C.672 25.5 0 24.825 0 24s.672-1.5 1.5-1.5h6v2.25Zm-3-14.25h3.075c-.03.255-.075.495-.075.75v2.25h-3c-.825 0-1.5-.675-1.5-1.5s.675-1.5 1.5-1.5Zm-3 7.5c0-.825.675-1.5 1.5-1.5h4.5v3H3c-.825 0-1.5-.675-1.5-1.5Z"
    />
  </svg>
)
export default ContactIcon;
