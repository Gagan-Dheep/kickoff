import { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/register/", formData);
      navigate("/login");
    } catch (error) {
        console.log(error);
        
        alert("User already exists");
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>Register</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth margin="normal" label="Username" name="username" onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Password" name="password" type="password" onChange={handleChange} />
        <Button fullWidth variant="contained" color="primary" type="submit">Register</Button>
      </form>
    </Container>
  );
}
