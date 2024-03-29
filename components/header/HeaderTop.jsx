import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toggleCartDetailsModal, changeLanguage } from '../../store/actions/cart.actions';
import { i18n, Link, withTranslation } from '../../i18n/i18n';
import BaseSocialLink from '../base/BaseSocialLink';

const HeaderTop = () => {
    const dispatch = useDispatch();
    const { languages, tenantDetails } = useSelector((state) => state.root.settings);
    const { currency } = useSelector((state) => state.root.settings);
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
    const [socialLinks, setSocialLinks] = useState([])
    const router = useRouter();
    const boundToggleCartDetailsModal = () => dispatch(toggleCartDetailsModal());

    useEffect(() => {
        const socialLinksList = !tenantDetails.socialLinks ? [] : tenantDetails.socialLinks.split(';');

        setSocialLinks(socialLinksList);
    }, [tenantDetails])

    const toggleLanguageDropdown = () => {
        setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
    };

    const onChangeLanguage = async language => {
        await i18n.changeLanguage(language);
        setIsLanguageDropdownOpen(false);
        dispatch(changeLanguage(language))
        console.log(i18n.language, "language")
        if (i18n.language == "en") {
            let path = window.location.pathname.split("/")
            path.splice(1, 1)
            window.history.replaceState(null, null, path.join("/"))
        } else if (i18n.language == "de") {
            let path = window.location.pathname.split("/")
            path[0] = "/de"
            window.history.replaceState(null, null, path.join("/"))
        }
    }

    const dropdown = (isActive) => {
        if (isActive) {
            return (
                <ul className="choice-lang">
                    {
                        languages.map((language) => {
                            return (
                                <li onClick={() => onChangeLanguage(language.name)} key={language.name}>
                                    {language.name}
                                </li>
                            )
                        })
                    }
                </ul>
            )
        }
    }

    return (
        <div className="header-top_right flex-center-end">
            <button type="button" className="btn-default d-flex align-items-center header-top__cart mr-4 px-3 py-2" onClick={boundToggleCartDetailsModal}>
                <span className="top__cart__currency mr-1">{currency}</span>
                <span className="header-top__cart__total mr-2">0.00</span>
                <img src="/images/icon/cart.svg" alt="" style={{ height: '1rem' }} />
            </button>
            <div className="language">
                <span className="language-value" onClick={toggleLanguageDropdown} style={{ color: '#fff' }}>{i18n.language}</span>
                {dropdown(isLanguageDropdownOpen)}
            </div>
            {
                socialLinks.length === 0 ? '' :
                    <div className="social flex-center">
                        <span>FOLLOW US:</span>
                        {
                            socialLinks.map((link, index) => {
                                return (<BaseSocialLink link={link} key={index} />);
                            })
                        }
                    </div>
            }
        </div>
    )
}

export default withTranslation()(HeaderTop);