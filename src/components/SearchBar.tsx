import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import '../css/SearchBar.css';

interface Props {
  displayCancelButton: boolean;
  searchText: string;
  handleOnFocus: Function;
  handleClearText: Function;
  handleSearchTextChange: Function;
  handleSearchCancel: Function;
}

const SearchBar = (props: Props) => {
  return (
    <div className="Search-Bar">
      <TextField
        variant="outlined"
        value={props.searchText}
        onFocus={() => props.handleOnFocus()}
        sx={{ background: 'white' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon>
                <SearchIcon />
              </Icon>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {props.searchText && (
                <Icon onClick={() => props.handleClearText()}>
                  <CancelIcon />
                </Icon>
              )}
            </InputAdornment>
          ),
        }}
        onChange={(event) => props.handleSearchTextChange(event.target.value)}
      />
      {props.displayCancelButton && (
        <Button
          sx={{ marginLeft: '1rem' }}
          variant="contained"
          color="error"
          onClick={() => props.handleSearchCancel()}
        >
          Cancel
        </Button>
      )}
    </div>
  );
};

export default SearchBar;
