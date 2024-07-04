import { Button } from "@mui/material";

export const CustomButton = ({ children, ...props }) => {
  return (
    <Button
      style={{
        backgroundColor: "white",
        color: "black",
        border: "1px solid transparent",
        ...props.style,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
