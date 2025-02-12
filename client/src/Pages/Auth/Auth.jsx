import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Box, Button, Typography } from "@mui/material";
import { DynamicInput } from "../../Components/DynamicComponents/DynamicInput";
import { createUser, loginUser } from "../../Redux/Slices/userSlice";

export const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSigned, setIsSigned] = useState(true);
  const [passwordType, setPasswordType] = useState("password");

  const isAuthenticated = !!localStorage.getItem("token");

  const { status } = useSelector((state) => state.users);
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user.email === "" || user.password === "") {
      toast.error("All fields are required");
      return;
    }

    if (!isSigned) {
      if (user.name === "") {
        toast.error("Name is required");
        return;
      }
    }

    console.log(user)

     if(isSigned) {
      dispatch(loginUser(user));
     } else {
      dispatch(createUser(user));
     }
  };

  if (status === "success") {
    navigate(-1);
  }

  const handleIsSigned = () => {
    setIsSigned(!isSigned);
    setUser({
      name: "",
      email: "",
      password: "",
    });
  };

  const inputData = [
    {
      title: "Name",
      name: "name",
      type: "text",
      value: user.name,
      placeholder: "Name",
      handleChange,
      isShow: !isSigned,
    },
    {
      title: "Email",
      name: "email",
      type: "email",
      value: user.email,
      placeholder: "Email",
      handleChange,
      isShow: true,
    },
    {
      title: "Password",
      name: "password",
      type: passwordType,
      value: user.password,
      placeholder: "Password",
      handleChange,
      isShow: true,
    },
  ];

  console.log(status)

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  if (status === "loading") {
    return <div>loading.....</div>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <Box
        sx={{
          boxShadow: "0px 0px 1px 0px #000000",
          width: "50%",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <Typography variant="h4" textAlign={"center"}>
          {isSigned ? "Login" : "Sign Up"}
        </Typography>
        <form
          style={{
            width: "80%",
            margin: "auto",
            padding: "20px",
            borderRadius: "20px",
          }}
          onSubmit={handleSubmit}
        >
          {inputData.map((input) => (
            <DynamicInput key={input.name} {...input} />
          ))}

          <Typography
            onClick={() =>
              setPasswordType(passwordType == "password" ? "text" : "password")
            }
            sx={{ textAlign: "end", cursor: "pointer" }}
          >
            {passwordType == "password" ? "Show" : "Hide"}
          </Typography>
          <Button
            sx={{
              display: "block",
              height: "50px",
              padding: "10px",
              margin: "20px 0px",
            }}
            fullWidth
            variant="contained"
            type="submit"
          >
            {isSigned ? "Login" : "Sign Up"}
          </Button>
        </form>

        <Typography textAlign={"center"}>
          {isSigned
            ? "Don't have an account?  "
            : "Already have and account?  "}{" "}
          <Link to={`/auth`} onClick={handleIsSigned}>
            {isSigned ? " Sign Up" : " Login"}
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};
