import { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login/", formData);
      localStorage.setItem("token", res.data.access);
      localStorage.setItem("id", res.data.id);
      console.log('Login successful, token stored:', res.data.access);
      console.log(res);
      navigate("/");
    } catch (error) {
      console.log("Invalid credentials", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth margin="normal" label="Username" name="username" onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Password" name="password" type="password" onChange={handleChange} />
        <Button fullWidth variant="contained" color="primary" type="submit">Login</Button>
      </form>
    </Container>
  );
}
