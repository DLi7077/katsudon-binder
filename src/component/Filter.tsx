import { Autocomplete, Box, createFilterOptions, TextField } from "@mui/material";

export default function Filter(props: {
  selected: string[];
  options: string[];
  handleFilterChange: (value: string[]) => void;
  label: string;
}) {
  const filterOptions = createFilterOptions<string>({});

  return (
    <Autocomplete
      multiple
      limitTags={4}
      filterOptions={filterOptions}
      options={props.options}
      getOptionLabel={(option: string) => option}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          {option}
        </Box>
      )}
      value={props.selected}
      size="small"
      sx={{ minWidth: "120px" }}
      onChange={(_, selected) => props.handleFilterChange(selected)}
      renderInput={(params) => <TextField {...params} variant="standard" label={props.label} />}
    />
  );
}
