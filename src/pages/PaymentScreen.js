import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
	Form,
	Button,
	Col,
	FormGroup,
	FormLabel,
	FormControl,
	FormCheck,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
//import Message from '../components/Message'
//import Loader from '../components/Loader'
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";

const PaymentScreen = () => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	const [paymentMethod, setPaymentMethod] = useState("PayPal");

	let navigate = useNavigate();

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		navigate("/placeorder");
	};

	return (
		<FormContainer>
			<CheckoutSteps step2 step3 />
			<h1>Payment Method</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as="legend">Select Method</Form.Label>

					<Col>
						<Form.Check
							type="radio"
							label="PayPal or Credit Card"
							id="PayPal"
							name="payment method"
							value="PayPal"
							checked
							onChange={(e) => setPaymentMethod(e.target.value)}
						></Form.Check>
					</Col>
				</Form.Group>

				<Button type="submit" variant="primary">
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentScreen;
