import React, { useState } from 'react';
import { useRouter } from 'next/router';
import _, { isNil } from 'lodash';
import useUserFetchCurrentUser from '../../hooks/user/useUserFetchCurrentUser';
import DefaultLayout from '../../layouts/DefaultLayout';
import TheHeader from '../../components/header/TheHeader';
import TheFooter from '../../components/footer/TheFooter';
import usePageOnLoad from '../../hooks/page/usePageOnLoad';
import ManagmentSection from '../../components/pageSection/profile/ManagmentSection'
import axios from '../../lib/axios';
import i18n from '../../i18n/i18n';

const getSettings = async () => {
	try {
		const url = `/settings?mediaTypeFilters=LOGO&mediaTypeFilters=FAVI_ICON&mediaTypeFilters=MOBILE_PROFILE_IMAGE&mediaTypeFilters=MOBILE_START_SCREEN&mediaTypeFilters=MOBILE_WELCOME_SCREEN`;
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
	// get brach
	const { branches } = settings;
	const currentBranch = branches.filter(
		(branch) => branch.id.toString() === branchId
	)[0];

	return {
		props: {
			settings,
			currentBranch
		},
	};
}

export default function Profile(props) {
	const { currentBranch } = props
	useUserFetchCurrentUser();
	usePageOnLoad(props);
	const router = useRouter();
	// const { category, searchText, priceFrom, priceTo } = router.query;

	return (
		<DefaultLayout>
			<TheHeader />
			<ManagmentSection currentBranch={currentBranch} />
			<TheFooter />
		</DefaultLayout>
	);
}
