import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import {
	Form,
	Button,
	FormGroup,
	FormLabel,
	FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { getUserDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";
//import { useEffect } from 'react/cjs/react.development'

const UserEditScreen = ({}) => {
	let { id } = useParams();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);

	let navigate = useNavigate();
	const location = useLocation();

	const dispatch = useDispatch();

	//const { search } = location
	//const queryParam= new URLSearchParams(search);
	//const redirectUrl =queryParam.get("redirectUrL") || "/";

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userUpdate = useSelector((state) => state.userUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = userUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: USER_UPDATE_RESET });
			navigate("/admin/userlist");
		} else {
			if (!user.name || user._id !== id) {
				dispatch(getUserDetails(id));
			} else {
				setName(user.name);
				setEmail(user.email);
				setIsAdmin(user.isAdmin);
			}
		}
	}, [user, dispatch, id, successUpdate]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(updateUser({ _id: id, name, email, isAdmin }));
	};

	return (
		<>
			<Link to="/admin/userlist" className="btn btn-light my-3">
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit User</h1>
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<FormGroup controlId="name">
							<FormLabel>Name</FormLabel>
							<FormControl
								type="name"
								placeholder="Enter Name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								disabled
							></FormControl>
						</FormGroup>

						<FormGroup controlId="email">
							<FormLabel>Email Address</FormLabel>
							<FormControl
								type="email"
								placeholder="Enter Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								disabled
							></FormControl>
						</FormGroup>

						<FormGroup controlId="isAdmin">
							<Form.Check
								type="checkbox"
								label="Is Admin"
								checked={isAdmin}
								onChange={(e) => setIsAdmin(e.target.checked)}
							></Form.Check>
						</FormGroup>
						<Button type="submit" variant="primary">
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
};

export default UserEditScreen;
