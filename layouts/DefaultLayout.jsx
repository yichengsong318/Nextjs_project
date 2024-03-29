import React, { useEffect, useState } from 'react';
import BannerAuthenticationVerifyEmail from '../components/banner/authentication/BannerAuthenticationVerifyEmail';
import AuthenticationContainer from '../containers/authentication/AuthenticationContainer';
import ProductsCustomizeContainer from '../containers/products/ProductsCustomizeContainer';
import CheckoutModalCartDetails from '../components/checkout/modal/CheckoutModalCartDetails';
import AddInformation from '../components/modal/addInformation';

const DefaultLayout = ({ children }) => {
	const [start, setStart] = useState(true)
	useEffect(() => {
		if (localStorage.getItem("position")) {
			setStart(true)
		} else {
			setStart(false)
		}
	},[])
	return (
		<div>
			<BannerAuthenticationVerifyEmail />
			<AuthenticationContainer />
			<ProductsCustomizeContainer />
			<CheckoutModalCartDetails />
			{
				start ? <div></div> : <AddInformation start={start} />
			}
			{children}
		</div>
	);
}

export default DefaultLayout;