import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import usePageOnLoad from '../../hooks/page/usePageOnLoad';
import { useSelector, useDispatch } from 'react-redux';
import i18n from '../../i18n/i18n';
import DefaultLayout from '../../layouts/DefaultLayout';
import useUserFetchCurrentUser from '../../hooks/user/useUserFetchCurrentUser';
import TheHeader from '../../components/header/TheHeader';
import TheFooter from '../../components/footer/TheFooter';
import PageSectionIndexChefsChoices from '../../components/pageSection/index/PageSectionIndexChefsChoices';
import PageSectionIndexSpecialCruise from '../../components/pageSection/index/PageSectionIndexSpecialCruise';
import PageSectionIndexDeliveryAvailability from '../../components/pageSection/index/PageSectionIndexDeliveryAvailability';
import PageSectionIndexOurRestaurant from '../../components/pageSection/index/PageSectionIndexOurRestaurant';
import PageSectionIndexOurResource from '../../components/pageSection/index/PageSectionIndexOurResource';
import PageSectionIndexOurChef from '../../components/pageSection/index/PageSectionIndexOurChef';
import PageSectionIndexOurLocation from '../../components/pageSection/index/PageSectionIndexOurLocation';
import PageSectionIndexHero from '../../components/pageSection/index/PageSectionIndexHero';
import axios from '../../lib/axios';
import _ from 'lodash';

const getSpecialCruises = async (branchId, language) => {
	try {
		const url = `customer/web/home-service/special-cruise?branchId=${branchId}&culture=${language}&deliveryType=Delivery`;
		const response = await axios.get(url);

		return response.data.result;
	} catch (error) {
		console.error(error);
		return [];
	}
};

const getChefChoices = async (branchId, language) => {
	try {
		const url = `customer/web/home-service/chef-choice?branchId=${branchId}&culture=${language}`;
		const response = await axios.get(url);

		return response.data.result;
	} catch (error) {
		console.error(error);

		return [];
	}
};

const getAppResources = async (branchId) => {
	try {
		const url = `customer/web/home-service/app-resources?branchId=${branchId}`;
		const response = await axios.get(url);

		return response.data.result;
	} catch (error) {
		console.error(error);

		return [];
	}
};

const getSubBanner = async (branchId) => {
	try {
		const url = `customer/web/home-service/sub-banner?branchId=${branchId}`;
		const response = await axios.get(url);

		return response.data.result;
	} catch (error) {
		console.error(error);

		return [];
	}
};

const getChefStory = async (branchId, language) => {
	try {
		const url = `customer/web/home-service/chef-story?branchId=${branchId}&culture=${language}`;
		const response = await axios.get(url);
		return response.data.result;
	} catch (error) {
		console.error(error);

		return [];
	}
};

const getSettings = async () => {
	try {
		const url = `settings?mediaTypeFilters=LOGO&mediaTypeFilters=FAVI_ICON&mediaTypeFilters=MOBILE_PROFILE_IMAGE&mediaTypeFilters=MOBILE_START_SCREEN&mediaTypeFilters=MOBILE_WELCOME_SCREEN`;
		const response = await axios.get(url);

		return response.data.result;
	} catch (error) {
		console.error(error);

		return [];
	}
};

export async function getServerSideProps(context) {
	const branchId = context.params.branch;
	const settings = await getSettings();

	// get current branch
	const { branches } = settings;
	const currentBranch = branches.filter((branch) => {
		return branch.id === parseInt(branchId);
    })[0];
    // if branch is not found
	if (_.isNil(currentBranch)) {
		context.res.statusCode = 404;
		context.res.end('Not found');
		return;
	}

	const specialCruises = await getSpecialCruises(branchId);
	const chefChoices = await getChefChoices(branchId);
	const appResources = await getAppResources(branchId);
	const subBanner = await getSubBanner(branchId);
	const chefStory = await getChefStory(branchId);

	return {
		props: {
			specialCruises,
			chefChoices,
			appResources,
			subBanner,
			chefStory,
			settings,
			currentBranch,
		},
	};
}

export default function Index(props) {

	useUserFetchCurrentUser();
	usePageOnLoad(props);
	const { currentBranch } = props;
	const [ render, setRender ] = useState(false);
	const [contentWidgets, setContentWidgets] = useState({});
	const [
		isDeliveryAvailabilitySectionVisible,
		setIsDeliveryAvailabilitySectionVisible,
	] = useState(true);
	const { currentLanguage } = useSelector((state) => state.cart)
	const [prop, setProp] = useState(props)

	const _process = async () => {
		const specialCruises = await getSpecialCruises(props.currentBranch.id, currentLanguage);
		const chefChoices = await getChefChoices(props.currentBranch.id, currentLanguage);
		const chefStory = await getChefStory(props.currentBranch.id, currentLanguage);
		setProp({
			...prop,
			specialCruises,
			chefChoices,
			chefStory
		})
	}
	// set which section to show and hide
	useEffect(() => {
		if (!currentBranch.contentWidgets) return;

		const contentWidgets = {};

		currentBranch.contentWidgets.forEach(({ name, isActive }) => {
			contentWidgets[name] = isActive;
		});

		setContentWidgets(contentWidgets);
	}, [currentBranch]);

	// set if delivery availability section is visible
	useEffect(() => {
		if (!currentBranch.contentWidgets) return;

		const { deliveryOption } = currentBranch.deliverySetting;
		setIsDeliveryAvailabilitySectionVisible(
			deliveryOption === 'DeliveryOnly' ||
				deliveryOption === 'DeliveryAndPickup'
		);
	}, [currentBranch]);

	useEffect(() => {
		 if(render) {
				_process()
		 }
		 setRender(true)
	}, [currentLanguage])

	return (
		<DefaultLayout>
			<TheHeader />
			{contentWidgets.CAROUSEL && <PageSectionIndexHero />}
			{contentWidgets.SPECIALCRUISE && prop && (
				<PageSectionIndexSpecialCruise
					specialCruises={prop.specialCruises}
				/>
			)}
			{isDeliveryAvailabilitySectionVisible && prop && (
				<PageSectionIndexDeliveryAvailability />
			)}
			{contentWidgets.CHEFSCHOICE && prop && (
				<PageSectionIndexChefsChoices chefChoices={prop.chefChoices} />
			)}
			{contentWidgets.SUBBANNER && prop && (
				<PageSectionIndexOurRestaurant subBanner={prop.subBanner} />
			)}
			{contentWidgets.CHEFSSTORY && prop && (
				<PageSectionIndexOurChef chefStory={prop.chefStory} />
			)}
			<PageSectionIndexOurLocation />
			{contentWidgets.APPRESOURCES && prop && (
				<PageSectionIndexOurResource
					appResources={prop.appResources}
				/>
			)}
			<TheFooter />
		</DefaultLayout>
	);
}
