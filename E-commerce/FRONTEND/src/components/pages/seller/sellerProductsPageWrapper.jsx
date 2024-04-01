import { Outlet } from "react-router-dom";
import { useState } from "react";
export default function SellerProductsPageWrapper() {
	const [newProductDetails, setNewProductDetails] = useState("hello");

	return <Outlet context={{ newProductDetails: newProductDetails, setNewProductDetails: setNewProductDetails }} />;
}
