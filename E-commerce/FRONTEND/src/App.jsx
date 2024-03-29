import { RouterProvider, createBrowserRouter, useNavigate } from "react-router-dom";
import Products from "./components/pages/home/Products";
import MainPage from "./components/pages/home/MainPage";
import Cart from "./components/pages/cart/cart";

import HomePage from "./components/pages/loginSign/homePage";
import SignUp from "./components/pages/loginSign/signup";
import Login from "./components/pages/loginSign/login";
import PlaceOrderPage from "./components/pages/orders/placeOrderPage";
import OrdersPage from "./components/pages/orders/ordersPage";
import WishlistPage from "./components/pages/wishlist/wishlistPage";

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
				path: "products",
				element: <Products />,
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
		],
	},
];

const router = createBrowserRouter(route);

function App() {
	return <RouterProvider router={router}></RouterProvider>;
}

export default App;
