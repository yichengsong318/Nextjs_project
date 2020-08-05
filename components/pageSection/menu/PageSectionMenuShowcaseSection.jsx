import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ProductsContainer from '../../../containers/products/ProductsContainer';

const PageSectionMenuShowcaseSection = ({ popularMeals, discountedMeals }) => {
	const { t } = useTranslation(['common']);
	const [currentActiveTab, setCurrentActiveTab] = useState('popular');
	const [products, setProducts] = useState([]);

    useEffect((
    ) => {
        if (currentActiveTab === 'popular') {
            setProducts(popularMeals);
        } else if (currentActiveTab === 'discount') {
            setProducts(discountedMeals);
        }
    }, [currentActiveTab]);

	return (
		<section className="special-cruise-tab menu-showcase-section pd-60">
			<div className="container">
				<ul className="nav nav-tabs">
                    <li className="nav-item" onClick={() => setCurrentActiveTab('popular')}>
						<h2
                            className={`title nav-link text-left ${currentActiveTab === 'popular' ? 'active' : ''}`}
						>
							<span>{t('popular')}</span>
						</h2>
					</li>
                    <li className="nav-item" onClick={() => setCurrentActiveTab('discount')}>
						<h2
                            className={`title nav-link text-left ${currentActiveTab === 'discount' ? 'active' : ''}`}
						>
							<span>{t('discount')}</span>
						</h2>
					</li>
				</ul>
				{products.length === 0 ? (
                    <div className="row">
                        <div className="text-center px-3 py-10 desc font-20 mgb-20">
                            <p>{t('no_result')}</p>
                        </div></div>
				) : (
					<ProductsContainer products={products} />
				)}
			</div>
		</section>
	);
};

export default PageSectionMenuShowcaseSection;
