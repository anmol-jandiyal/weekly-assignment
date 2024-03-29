import React from "react";
import { useSelector } from "react-redux";
import WishlistCard from "./wishlistCard";

export default function WishlistPage() {
	const wishlist = useSelector((store) => {
		return store.wishlistState.wishlist;
	});

	return (
		<div className="wishlistPage">
			{wishlist.length === 0 ? (
				<h1 style={{ textAlign: "center", color: "gray" }}>NO Item In Wishlist</h1>
			) : (
				<div>
					{" "}
					<h1 style={{ textAlign: "center" }}>Your Wishlist</h1>
					<div style={{ display: "flex", flexWrap: "wrap", gap: "30px" }}>
						{wishlist.map((product, index) => {
							return <WishlistCard product={product} key={index} />;
						})}
					</div>
				</div>
			)}
		</div>
	);
}
