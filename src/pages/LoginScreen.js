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
import { login } from "../actions/userActions";
//import { useEffect } from 'react/cjs/react.development'

const LoginScreen = ({}) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	let navigate = useNavigate();
	const location = useLocation();
	console.log(location);

	/*const  searchParams  = new URLSearchParams(location.search);
const  redirect  = searchParams ? searchParams.get(('=')[1]) : "/";*/

	//console.log({searchParams})

	//const params = useParams()

	const dispatch = useDispatch();

	const { search } = location;
	//console.log(search)
	//const redirect = search.split("=")[1]
	//console.log(redirect)
	const queryParam = new URLSearchParams(search);
	//const redirectUrl =queryParam.get("redirectUrL")
	const redirectUrl = search ? search.split("=")[1] : "/";
	console.log(redirectUrl);

	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	useEffect(() => {
		if (userInfo) {
			if (redirectUrl === "/") {
				navigate("/");
			} else {
				navigate(`/${redirectUrl}`);
			}
		}
	}, [userInfo, redirectUrl]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(login(email, password));
	};

	return (
		<FormContainer>
			<h1>Sign In</h1>
			<Form onSubmit={submitHandler}>
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

				<Button type="submit" variant="primary">
					Sign In
				</Button>
			</Form>

			<Row className="py-3">
				<Col>
					New Customer? <Link to="/register">Register</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default LoginScreen;
