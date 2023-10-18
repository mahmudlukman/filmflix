/* eslint-disable react/prop-types */
import { Typography, Box } from '@mui/material';

import Movie from '../Movie/Movie';

const RatedCards = ({ title, data }) => {

  return (
    <Box>
      <Typography variant="h5" gutterBottom>{title}</Typography>
      <Box display="flex" flexWrap="wrap" sx={{}}>
        {data?.results.map((movie, i) => (
          <Movie key={movie.id} movie={movie} i={i} />
        ))}
      </Box>
    </Box>
  );
}

export default RatedCards;