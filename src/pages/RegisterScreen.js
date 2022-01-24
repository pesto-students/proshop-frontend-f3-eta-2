import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
	Form,
	Button,
	Row,
	Col,
	FormGroup,
	FormLabel,
	FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";

const RegisterScreen = ({}) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState(null);
	let navigate = useNavigate();
	const location = useLocation();

	const dispatch = useDispatch();

	const { search } = location;
	const queryParam = new URLSearchParams(search);
	const redirectUrl = queryParam.get("redirectUrL") || "/";

	const userRegister = useSelector((state) => state.userRegister);
	const { loading, error, userInfo } = userRegister;

	useEffect(() => {
		if (userInfo) {
			navigate(redirectUrl);
		}
	}, [userInfo, redirectUrl]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage("Passwords do not match");
		} else {
			dispatch(register(name, email, password));
		}
	};

	return (
		<FormContainer>
			<h1>Sign Up</h1>
			{message && <Message variant="danger">{message}</Message>}
			{error && <Message variant="danger">{error}</Message>}

			<Form onSubmit={submitHandler}>
				<FormGroup controlId="name">
					<FormLabel>Name</FormLabel>
					<FormControl
						type="name"
						placeholder="Enter Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					></FormControl>
				</FormGroup>

				<FormGroup controlId="email">
					<FormLabel>Email Address</FormLabel>
					<FormControl
						type="email"
						placeholder="Enter Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></FormControl>
				</FormGroup>

				<FormGroup controlId="password">
					<FormLabel>Password</FormLabel>
					<FormControl
						type="password"
						placeholder="Enter Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></FormControl>
				</FormGroup>

				<FormGroup controlId="confirmPassword">
					<FormLabel>Confirm Password</FormLabel>
					<FormControl
						type="password"
						placeholder="Password Password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					></FormControl>
				</FormGroup>

				<Button type="submit" variant="primary">
					Register
				</Button>
			</Form>

			<Row className="py-3">
				<Col>
					Have an account? <Link to="/login">Login</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default RegisterScreen;
