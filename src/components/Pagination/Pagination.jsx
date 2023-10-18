/* eslint-disable react/prop-types */
import { Button, Container, Typography, useTheme } from "@mui/material";

const Pagination = ({ currentPage, totalPages, setPage }) => {
  const theme = useTheme();

  const handlePrev = () => {
    if(currentPage !== 1) {
      setPage((prevPage) => prevPage - 1)
    }
  };
  const handleNext = () => {
    if(currentPage !== totalPages){
      setPage((prevPage) => prevPage + 1)
    }
  };

  if (totalPages === 0) return null;

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        onClick={handlePrev}
        variant="contained"
        color="primary"
        type="button"
        margin="30px 2px"
      >
        Prev
      </Button>
      <Typography
        variant="h4"
        sx={{ margin: "0 20px !important", color: theme.palette.text.primary }}
      >
        {currentPage}
      </Typography>
      <Button
        onClick={handleNext}
        variant="contained"
        color="primary"
        type="button"
      >
        Next
      </Button>
    </Container>
  );
};

export default Pagination;
