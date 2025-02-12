import { TextField, Box, Typography } from "@mui/material";

export const DynamicInput = ({ isShow, title, type, name, value, handleChange }) => {
  if (!isShow) return null;

  return (
    <Box sx={{ display: "block", mb: 2 }}>
      <TextField
        fullWidth
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        label={title}
        variant="outlined"
        sx={{
          bgcolor: "white",
          borderRadius: "8px",
          "& .MuiOutlinedInput-root": {
            padding: "5px",
            borderColor: "gray.300",
            "&:hover fieldset": { borderColor: "gray.400" },
            "&.Mui-focused fieldset": { borderColor: "gray.500" }
          }
        }}
      />
    </Box>
  );
};

