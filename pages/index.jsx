import { useState, useEffect } from 'react';
import { i18n, withTranslation } from '../i18n/i18n';
import usePageOnLoad from '../hooks/page/usePageOnLoad';
import DefaultLayout from '../layouts/DefaultLayout';
import useUserFetchCurrentUser from '../hooks/user/useUserFetchCurrentUser';
import TheHeader from '../components/header/TheHeader';
import TheFooter from '../components/footer/TheFooter';
import PageSectionIndexChefsChoices from '../components/pageSection/index/PageSectionIndexChefsChoices';
import PageSectionIndexSpecialCruise from '../components/pageSection/index/PageSectionIndexSpecialCruise';
import PageSectionIndexDeliveryAvailability from '../components/pageSection/index/PageSectionIndexDeliveryAvailability';
import PageSectionIndexOurRestaurant from '../components/pageSection/index/PageSectionIndexOurRestaurant';
import PageSectionIndexOurResource from '../components/pageSection/index/PageSectionIndexOurResource';
import PageSectionIndexOurChef from '../components/pageSection/index/PageSectionIndexOurChef';
import PageSectionIndexOurLocation from '../components/pageSection/index/PageSectionIndexOurLocation';
import PageSectionIndexHero from '../components/pageSection/index/PageSectionIndexHero';
import axios from '../lib/axios';

const getSpecialCruises = async (branchId) => {
	try {
		const url = `customer/web/home-service/special-cruise?branchId=${branchId}&culture=${i18n.language}&deliveryType=Delivery`;
		const response = await axios.get(url);

		return response.data.result;
	} catch (error) {
		console.error(error);
		return [];
	}
};

const getChefChoices = async (branchId) => {
	try {
		const url = `customer/web/home-service/chef-choice?branchId=${branchId}&culture=${i18n.language}`;
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

const getChefStory = async (branchId) => {
	try {
		console.log(i18n.language, "language")
		const url = `customer/web/home-service/chef-story?branchId=${branchId}&culture=${i18n.language}`;
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

export async function getServerSideProps() {
	const settings = await getSettings();
	const { branches } = settings;
	const currentBranch = branches.filter((branch) => branch.primaryBranch)[0];
	console.log(currentBranch.id, "currentbranch Id")

	return {
		props: {
			settings,
			currentBranch,
		},
	};
}

function Index(props) {
	useUserFetchCurrentUser();
	usePageOnLoad(props);
	const { currentBranch } = props;
	const [contentWidgets, setContentWidgets] = useState({});
	const [
		isDeliveryAvailabilitySectionVisible,
		setIsDeliveryAvailabilitySectionVisible,
	] = useState(true);
	const [prop, setProp] = useState()
	// set which section to show and hide

	useEffect(() => {
		if (!currentBranch.contentWidgets) return;
		const contentWidgets = {};
		currentBranch.contentWidgets.forEach(({ name, isActive }) => {
			contentWidgets[name] = isActive;
		});
		setContentWidgets(contentWidgets);
	}, [currentBranch]);

	useEffect(() => {
		console.log(i18n.language, "language -- client")
	}, [])
	// set if delivery availability section is visible
	useEffect(() => {
		if (!currentBranch.contentWidgets) return;

		const { deliveryOption } = currentBranch.deliverySetting;
		setIsDeliveryAvailabilitySectionVisible(
			deliveryOption === 'DeliveryOnly' ||
			deliveryOption === 'DeliveryAndPickup'
		);
	}, [currentBranch]);

	useEffect(async () => {
		console.log(props.currentBranch.id, "props")
		const specialCruises = await getSpecialCruises(props.currentBranch.id);
		const chefChoices = await getChefChoices(props.currentBranch.id);
		const appResources = await getAppResources(props.currentBranch.id);
		const subBanner = await getSubBanner(props.currentBranch.id);
		const chefStory = await getChefStory(props.currentBranch.id);
		console.log(chefStory, "chefstory")
		setProp({
			...prop,
			specialCruises,
			chefChoices,
			appResources,
			subBanner,
			chefStory
		})
	}, [])

	return (
		<DefaultLayout>
			<TheHeader />
			{contentWidgets.CAROUSEL && <PageSectionIndexHero />}
			{contentWidgets.SPECIALCRUISE && prop && (
				<PageSectionIndexSpecialCruise
					specialCruises={prop.specialCruises}
				/>
			)}
			{isDeliveryAvailabilitySectionVisible && (
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

export default withTranslation()(Index);