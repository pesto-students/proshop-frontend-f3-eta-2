import axios from "axios";
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
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const ProductEditScreen = ({}) => {
	let { id } = useParams();
	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState("");
	const [brand, setBrand] = useState("");
	const [category, setCategory] = useState("");
	const [countInStock, setCountInStock] = useState(0);
	const [description, setDescription] = useState("");
	const [uploading, setUploading] = useState(false);

	let navigate = useNavigate();
	const location = useLocation();

	const dispatch = useDispatch();

	//const { search } = location
	//const queryParam= new URLSearchParams(search);
	//const redirectUrl =queryParam.get("redirectUrL") || "/";

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	const productUpdate = useSelector((state) => state.productUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = productUpdate;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: PRODUCT_UPDATE_RESET });
			navigate("/admin/productlist");
		} else {
			if (!product.name || product._id !== id) {
				dispatch(listProductDetails(id));
			} else {
				setName(product.name);
				setPrice(product.price);
				setImage(product.image);
				setBrand(product.brand);
				setCategory(product.category);
				setCountInStock(product.countInStock);
				setDescription(product.description);
			}
		}
	}, [successUpdate]);

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append("image", file);
		setUploading(true);

		try {
			const config = {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			};

			const { data } = await axios.post("/api/upload", formData, config);
			setImage(data);
			setUploading(false);
		} catch (error) {
			console.error(error);
			setUploading(false);
		}
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateProduct({
				_id: id,
				name,
				price,
				image,
				brand,
				category,
				description,
				countInStock,
			})
		);
	};

	return (
		<>
			<Link to="/admin/productlist" className="btn btn-light my-3">
				Go Back
			</Link>
			<FormContainer>
				<h1>Add Product</h1>
				{errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
				{error ? (
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
							></FormControl>
						</FormGroup>

						<FormGroup controlId="price">
							<FormLabel>Price</FormLabel>
							<FormControl
								type="number"
								placeholder="Enter Price"
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							></FormControl>
						</FormGroup>

						<FormGroup controlId="image">
							<FormLabel>Image</FormLabel>
							<FormControl
								type="text"
								placeholder="Enter Image Url"
								value={image}
								onChange={(e) => setImage(e.target.value)}
							></FormControl>
							<input
								type="file"
								className="custom-file-input"
								onChange={uploadFileHandler}
							/>
						</FormGroup>

						<FormGroup controlId="brand">
							<FormLabel>Brand</FormLabel>
							<FormControl
								type="text"
								placeholder="Enter Brand"
								value={brand}
								onChange={(e) => setBrand(e.target.value)}
							></FormControl>
						</FormGroup>

						<FormGroup controlId="countInStock">
							<FormLabel>Count In Stock</FormLabel>
							<FormControl
								type="number"
								placeholder="Enter Count In Stock"
								value={countInStock}
								onChange={(e) => setCountInStock(e.target.value)}
							></FormControl>
						</FormGroup>

						<FormGroup controlId="category">
							<FormLabel>Category</FormLabel>
							<FormControl
								type="text"
								placeholder="Enter Category"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							></FormControl>
						</FormGroup>

						<FormGroup controlId="description">
							<FormLabel>Description</FormLabel>
							<FormControl
								type="text"
								placeholder="Enter Description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							></FormControl>
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

export default ProductEditScreen;
