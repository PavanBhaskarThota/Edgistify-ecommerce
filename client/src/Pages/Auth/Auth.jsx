import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Box, Button, Typography } from "@mui/material";
import { DynamicInput } from "../../Components/DynamicComponents/DynamicInput";
import { createUser, loginUser } from "../../Redux/Slices/userSlice";
import { Loading } from "../../Components/Loader/Loading";

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

    console.log(user);

    if (isSigned) {
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

  console.log(status);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        justifyContent: {xs:"start", md:"center"},
        alignItems: {xs:"center", md:"center"},
        minHeight: "90vh",
        bgcolor: "#ECDFCC",
      }}
    >
      <Box
        sx={{
          boxShadow: "0px 0px 1px 0px #000000",
          width: {xs:"90%", sm:"40%", md:"30%"},
          padding: "10px",
          borderRadius: "10px",
          marginTop:{xs:'30px'}
        }}
      >
        <Typography variant="h4" textAlign={"center"}>
          {isSigned ? "Login" : "Sign Up"}
        </Typography>
        <form
          style={{
            width: "90%",
            margin: "auto",
            padding: "20px",
            borderRadius: "20px",
          }}
          onSubmit={handleSubmit}
        >
          {inputData.map((input) => (
            <DynamicInput key={input.name} {...input} />
          ))}

          <Button
            onClick={() =>
              setPasswordType(passwordType == "password" ? "text" : "password")
            }
            color={passwordType == "password" ? "success" : "error"}
            variant="outlined"
            sx={{
              textAlign: "end",
              cursor: "pointer",
              display: "block",
              marginLeft: "auto",
            }}
          >
            {passwordType == "password" ? "Show" : "Hide"}
          </Button>
          <Button
            sx={{
              display: "block",
              height: "50px",
              padding: "10px",
              margin: "20px 0px",
              bgcolor:'#5C3D2E'
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
