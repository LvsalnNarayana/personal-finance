/* eslint-disable react/prop-types */

import { Box } from "@mui/material";

const TableWrapper = ({ children }) => {
  return (
    <Box
      component="div"
      sx={{
        width: "100%",
        borderRadius: 1,
        maxWidth: "100%",
        overflowY: "auto",
        maxHeight: "60vh",
        minHeight: "60vh",
        overflowX: "initial",
        position: "relative",
        backgroundColor: "#fff",
        border: "1px solid #ccc",
      }}
    >
      {children}
    </Box>
  );
};

export default TableWrapper;

