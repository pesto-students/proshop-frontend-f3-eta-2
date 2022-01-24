import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import {
	Form,
	Button,
	Row,
	Col,
	FormGroup,
	FormLabel,
	FormControl,
	Table,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
//import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
//import { useEffect } from 'react/cjs/react.development'

const ProfileScreen = ({}) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState(null);
	let navigate = useNavigate();
	const location = useLocation();
	let { id } = useParams();

	const dispatch = useDispatch();

	const { search } = location;
	const queryParam = new URLSearchParams(search);

	const userDetails = useSelector((state) => state.userDetails);
	const { user } = userDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const { success } = userUpdateProfile;

	const orderListMy = useSelector((state) => state.orderListMy);
	const { loading, error, orders } = orderListMy;

	useEffect(() => {
		if (userInfo) {
			dispatch(listMyOrders());
		} else {
			navigate("/login");
		}
	}, [dispatch, userInfo]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage("Passwords do not match");
		} else {
			dispatch(updateUserProfile({ id: user._id, name, email, password }));
		}
	};

	return (
		<>
			<Row>
				<Col md={3}>
					<h2>User Profile</h2>
					{message && <Message variant="danger">{message}</Message>}
					{error && <Message variant="danger">{error}</Message>}
					{success && <Message variant="success">Profile Updated</Message>}

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
							Update
						</Button>
					</Form>
				</Col>
				<Col md={9}>
					<h2>My Orders</h2>
					{error ? (
						<Message variant="danger">{error}</Message>
					) : (
						<Table striped border hover responsive className="table-sm">
							<thead>
								<tr>
									<th>DATE</th>
									<th>TOTAL</th>
									<th>PAID</th>
									<th>DELIVERED</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{orders?.map((order) => (
									<tr key={order._id}>
										<td>{order.createdAt.substring(0, 10)}</td>
										<td>{order.totalPrice}</td>
										<td>
											{order.isPaid ? (
												order.paidAt.substring(0, 10)
											) : (
												<i
													className="fas fa-times"
													style={{ color: "red" }}
												></i>
											)}
										</td>
										<td>
											{order.isDelivered ? (
												order.deliveredAt.substring(0, 10)
											) : (
												<i
													className="fas fa-times"
													style={{ color: "red" }}
												></i>
											)}
										</td>
										<td>
											<LinkContainer to={`/order/${order._id}`}>
												<Button className="btn-sm" variant="light">
													Details
												</Button>
											</LinkContainer>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					)}
				</Col>
			</Row>
		</>
	);
};

export default ProfileScreen;
