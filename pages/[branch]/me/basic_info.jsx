import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DefaultLayout from '../../../layouts/DefaultLayout';
import TheHeader from '../../../components/header/TheHeader';
import TheFooter from '../../../components/footer/TheFooter';
import { useTranslation } from 'react-i18next';
import axios from '../../../lib/axios';
import Autocomplete from '../../../components/element/Autocomplete';
import ProfileInfoSide from '../../../components/pageSection/profile/ProfileInfoSide';
import usePageOnLoad from '../../../hooks/page/usePageOnLoad';
import useUserFetchCurrentUser from '../../../hooks/user/useUserFetchCurrentUser';
import { toast, ToastContainer } from 'react-nextjs-toast';
import _ from 'lodash';

const getUserDetails = async () => {
  try {
    const url = '/customer/web/profile-service/me';
    const response = await axios.get(url);
    return response.data.result;
  } catch (error) {
    console.error(error);
    return false;
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

  return {
    props: {
      settings,
      currentBranch,
    },
  };
}

export default function basic_info(props) {
  useUserFetchCurrentUser();
  usePageOnLoad(props);
  const { currentBranch } = props;

  const [userDetails, setUserDetails] = useState();
  const [inputValues, setInputValues] = useState({});
  const [phoneEditable, setPhoneEditable] = useState(false);
  const { currentUser } = useSelector((state) => state.authentication);
  const [shine, setShine] = useState(true);
  const [postalCodeData, setPostalCodeData] = useState([]);
  const [postalcode, setPostalCode] = useState('');
  const [provinceData, setProvinceData] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [cityName, setCity] = useState('');
  const [province, setProvince] = useState();
  const [country, setCountry] = useState('Switzerland');
  const [postalId, setPostalId] = useState('');

  const _process = async () => {
    const userDetails = await getUserDetails();
    setUserDetails(userDetails);
    if (userDetails) {
      setInputValues({
        firstname: userDetails.name,
        lastname: userDetails.surname,
        streetname: userDetails.streetName,
        doornr: userDetails.doorNumber,
        postalcode: userDetails.postalCodeId,
        city: userDetails.city,
        province_id: userDetails.provinceId,
        countryId: userDetails.countryId,
        phonenumber: userDetails.phoneNumber.slice(3),
        phoneHeader: userDetails.phoneNumber.slice(0, 3),
        email: userDetails.email,
      });
    }
  };

  useEffect(() => {
    if (!userDetails) {
      _process();
    }
  }, [userDetails]);

  const getCityFromAuto = (value) => {
    console.log(value, 'cityname');
  };

  const getProvinceFromAuto = (value) => {
    console.log(value, 'province');
  };

  const getCountryFromAuto = (value) => {
    console.log(value, 'country');
  };

  const postUserDetails = async (data) => {
    try {
      const url = '/customer/web/profile-service/me';
      const response = await axios.post(url, data);
      if(response.data){
          toast.notify("successfully saved", {
          duration: 5,
          position: "top",
          targetId: "basicinfoSaved"
        })
      }
      
      return response.data.result;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const getPostalCode = async (val) => {
    try {
      const url = `customer/web/home-service/postal-codes?postalCodeSearch=${val}`;
      const response = await axios.get(url);
      debugger
      return response.data.result;
    } catch (error) {
      showErrorMessage(t('an_error_happend'));
      return [];
    }
  };

  const getCountry = async (userDetails) => {
    try {
      const url = `/settings/countries`;
      const res = await axios.get(url);
      setCountryData(res.data.result);
      let country = res.data.result.filter((country) => {
        if (country.id == userDetails.countryId) return country;
      });

      getProvinces(userDetails.countryId, userDetails);
      if (country.length > 0) setCountry(country[0].name);
      return res.data.result;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getProvinces = async (countryId, userDetails) => {
    try {
      let url = '';
      if (countryId) {
        url = `/settings/countries/${countryId}/provinces`;
      } else {
        url = `/settings/countries/1/provinces`;
      }

      const res = await axios.get(url);
      setProvinceData(res.data.result);
      let province = res.data.result.filter((prov) => {
        if (prov.id == userDetails.provinceId) return prov;
      });

      if (province.length > 0) setProvince(province[0].name);
      return res.data.result;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const verifyPhone = async () => {
    const phonenumber = inputValues.phonenumber;
    let url = `/customer/send-phone-verification-code?phone=+41${phonenumber}`;
    try {
      var res = await axios.post(url, {});
      console.log(res.data.success);
      if (res.data.success) {
        toast.notify(
          'Phone verification code is successfully sent to your phone',
          {
            duration: 5,
            position: 'top',
            targetId: 'phone-Verify',
            title: 'Success',
          },
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCountry(userDetails);
  }, [userDetails]);

  // useEffect(() => {
  // }, [postalcode])

  useEffect(() => {
    if (currentUser.isPhoneConfirmed) setPhoneEditable(true);
  });

  const getPostalCodeFromAuto = async (value) => {
    if (value === '') return;
    const codes = await getPostalCode(value);
    debugger
    setPostalCodeData(codes);
    if (value.length == 4) {
      const postalIdVal = codes[0].id;
      setPostalId(postalIdVal);
    }
  };

  const onSave = (e) => {
    e.preventDefault();

    let data = {
      surname: inputValues.lastname,
      name: inputValues.firstname,
      avatar: '',
      doorNumber: inputValues.doornr,
      streetName: inputValues.streetname,
      postalCodeId: postalId,
      city: inputValues.city,
      provinceId: inputValues.province,
      countryId: inputValues.country,
      id: 1,
    };

    postUserDetails(data);
  };

  const onInputHandle = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  const onPhoneEdit = () => {
    setPhoneEditable(false);
  };

  return (
    <DefaultLayout>
      <ToastContainer align={"right"} position={"top"} id="basicinfoSaved" />
      <TheHeader />
      <ProfileInfoSide pageurl="basic_info">
        <div>
          <div class="order-right">
            <ToastContainer
              align={'right'}
              position={'top'}
              id="phone-Verify"
            />
            <form class="profile-form" onSubmit={onSave}>
              <h1 class="font-20 font-demi mgb-60">BASIC INFORMATION</h1>
              <div class="row">
                <div class="col-md-6">
                  <div class="label-top relative">
                    <label>First name</label>
                    <input
                      type="text"
                      placeholder="First name"
                      name="firstname"
                      onChange={onInputHandle}
                      class="input-radius h56"
                      value={inputValues.firstname}
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="label-top relative">
                    <label>Last name</label>
                    <input
                      type="text"
                      placeholder="Last name"
                      class="input-radius h56"
                      onChange={onInputHandle}
                      name="lastname"
                      value={inputValues.lastname}
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="label-top relative">
                    <label>Street Name</label>
                    <input
                      type="text"
                      placeholder="Street Name"
                      name="streetname"
                      onChange={onInputHandle}
                      class="input-radius h56"
                      value={inputValues.streetname}
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="label-top relative">
                    <label>Door Nr</label>
                    <input
                      type="text"
                      placeholder="Door Nr"
                      class="input-radius h56"
                      onChange={onInputHandle}
                      name="doornr"
                      value={inputValues.doornr}
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="label-top relative">
                    <label>Postal Code</label>
                    <Autocomplete
                      value={postalcode}
                      getValue={getPostalCodeFromAuto}
                      placeholder="Postal Code"
                      suggestions={postalCodeData.map((code) => code.zip)}
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="label-top relative">
                    <label>City</label>
                    <input
                      type="text"
                      value={inputValues.city}
                      placeholder="City"
                      name="city"
                      class="input-radius h56"
                      onChange={onInputHandle}
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="label-top relative">
                    <label>Province</label>
                    {provinceData && province ? (
                      <Autocomplete
                        value={province}
                        getValue={getProvinceFromAuto}
                        placeholder="Province"
                        suggestions={provinceData.map(
                          (province) => province.name,
                        )}
                      />
                    ) : (
                      <input
                        type="text"
                        placeholder="Province "
                        class="input-radius h56"
                      />
                    )}
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="label-top relative">
                    <label>Country</label>
                    {countryData && country ? (
                      <Autocomplete
                        value={country}
                        getValue={getCountryFromAuto}
                        placeholder="Country"
                        suggestions={countryData.map((country) => country.name)}
                      />
                    ) : (
                      <input
                        type="text"
                        placeholder="Country "
                        class="input-radius h56"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div class="label-top relative">
                <label>Phone number</label>
                <div class="box-telephone relative">
                  <span class="area-code inflex-center-center">
                    {inputValues.phoneHeader}
                  </span>
                  <input
                    type="text"
                    disabled={phoneEditable}
                    placeholder="364 239 2830"
                    onChange={onInputHandle}
                    name="phonenumber"
                    class="input-radius h56"
                    value={inputValues.phonenumber}
                  />
                  {currentUser.isPhoneConfirmed && phoneEditable ? (
                    <button
                      type="button"
                      onClick={onPhoneEdit}
                      class="vertify-button font-16 font-demi"
                      data-target="#verify-phone"
                      data-toggle="modal"
                    >
                      Edit
                    </button>
                  ) : (
                    <button
                      type="button"
                      class="vertify-button font-16 font-demi"
                      data-target="#verify-phone"
                      onClick={verifyPhone}
                      data-toggle="modal"
                    >
                      Vertify
                    </button>
                  )}
                </div>
              </div>
              <div class="label-top relative">
                <label>E-mail</label>
                <input
                  disabled
                  type="text"
                  placeholder="Infor@gmail.com"
                  value={inputValues.email}
                  name="email"
                  onChange={onInputHandle}
                  class="input-radius h56"
                />
              </div>
              <div class="text-right">
                <button
                  type="submit"
                  class="btn btn-yellow btn-h60 font-demi font-20 w230"
                >
                  SAVE
                </button>
              </div>
            </form>
          </div>
          <div class="order-right mgt-30 pd-55">
            <div class="update-progess">
              <h2 class="font-20 font-demi mgb-40">UPDATE PROFILE</h2>
              <ul class="progressbar-update">
                <li class="active">Add Address</li>
                <li className={currentUser.isPhoneConfirmed && 'active'}>
                  <div class="box-verphone text-center">
                    <p>Vertify Phone</p>
                    <p>
                      <button class="btn-default">Vertify</button>
                    </p>
                  </div>
                </li>
                <li className={currentUser.isEmailConfirmed && 'active'}>
                  <div class="box-verphone text-center">
                    <p>Confirm Mail</p>
                    <p>
                      <button class="btn-default">Check</button>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </ProfileInfoSide>
      <TheFooter />
    </DefaultLayout>
  );
}
