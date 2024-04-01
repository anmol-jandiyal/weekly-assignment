import { Outlet, RouterProvider, createBrowserRouter, useNavigate } from "react-router-dom";
import Products from "./components/pages/home/Products";
import MainPage from "./components/pages/home/MainPage";
import Cart from "./components/pages/cart/cart";

import HomePage from "./components/pages/loginSign/homePage";
import SignUp from "./components/pages/loginSign/signup";
import Login from "./components/pages/loginSign/login";
import PlaceOrderPage from "./components/pages/orders/placeOrderPage";
import OrdersPage from "./components/pages/orders/ordersPage";
import WishlistPage from "./components/pages/wishlist/wishlistPage";
import FilterPage from "./components/pages/home/FilterPage";
import SellerPage from "./components/pages/seller/sellerPage";
import AddProductsPage from "./components/pages/seller/AddProducts";
import SellerProductsPage from "./components/pages/seller/SellerProductPage";
import EditProductPage from "./components/pages/seller/editProductPage";
import SellerProductsPageWrapper from "./components/pages/seller/sellerProductsPageWrapper";
import SellerPlacedOrderPage from "./components/pages/seller/PlacedOrderPage";

const route = [
	{
		path: "/",
		element: (
			<div>
				<HomePage />
			</div>
		),
		children: [
			{
				path: "signup",
				element: <SignUp />,
			},
			{
				path: "login",
				element: <Login />,
			},
		],
	},

	{
		path: "/mainPage",
		element: <MainPage />,

		children: [
			{
				path: "",
				element: <Products />,
			},
			{
				path: "home",
				element: <Products />,
			},
			{
				path: "searchProducts",
				element: <FilterPage />,
			},
			{
				path: "cart",
				element: <Cart />,
			},
			{
				path: "placeOrderPage",
				element: <PlaceOrderPage />,
			},
			{
				path: "ordersPage",
				element: <OrdersPage />,
			},
			{
				path: "wishlistPage",
				element: <WishlistPage />,
			},
			{
				path: "seller",
				element: <SellerPage />,
				children: [
					{
						path: "addProducts",
						element: <AddProductsPage />,
					},
					{
						path: "orders",
						element: <SellerPlacedOrderPage />,
					},
					{
						path: "products",
						element: <SellerProductsPageWrapper />,
						children: [
							{
								path: "",
								element: <SellerProductsPage />,
							},
							{
								path: "edit",
								element: <EditProductPage />,
							},
						],
					},
				],
			},
		],
	},
];

const router = createBrowserRouter(route);

function App() {
	return <RouterProvider router={router}></RouterProvider>;
}

export default App;
