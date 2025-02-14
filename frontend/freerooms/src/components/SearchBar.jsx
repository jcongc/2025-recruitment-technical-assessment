import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

const SearchBar = () => {
  return (
    <div className="search-bar">
      <TextField
        variant="outlined"
        placeholder="Search for a building..."
        fullWidth
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
        size="small"
      />
    </div>
  );
};

export default SearchBar;
