import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';
import axios from '../../../lib/axios';
import Autocomplete from '../../element/Autocomplete'

function PageSectionBasicInfo(props) {
  const { userDetails } = props

  const [inputValues, setInputValues] = useState({
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
    email: userDetails.email
  })
  const [phoneEditable, setPhoneEditable] = useState(false)
  const { currentUser } = useSelector((state) => state.authentication);
  const [shine, setShine] = useState(true)
  const [postalCodeData, setPostalCodeData] = useState([])
  const [postalcode, setPostalCode] = useState("")
  const [provinceData, setProvinceData] = useState([])
  const [countryData, setCountryData] = useState([])
  const [cityName, setCity] = useState("")
  const [province, setProvince] = useState()
  const [country, setCountry] = useState("Switzerland")

  const getCityFromAuto = (value) => {
    console.log(value, "cityname")
  }

  const getProvinceFromAuto = (value) => {
    console.log(value, "province")
  }

  const getCountryFromAuto = (value) => {
    console.log(value, "country")
  }

  const postUserDetails = async (data) => {
    try {
      const url = "/customer/web/profile-service/me";
      const response = await axios.post(url, data);
      return response.data.result;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const getPostalCode = async (userDetails) => {
    try {
      const url = "/customer/web/home-service/postal-codes?postalCodeSearch=1"
      const response = await axios.get(url);
      console.log(response.data.result)
      setPostalCodeData(response.data.result, "postalCodeData")
      let postalcode = response.data.result.filter(code => {
        if (code.id == userDetails.postalCodeId)
          return postalcode
      })
      setPostalCode(postalcode)
      console.log(postalcode, "postalcodecode")
      return response.data.result;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  const getCountry = async (userDetails) => {
    try {
      const url = `/settings/countries`;
      const res = await axios.get(url)
      setCountryData(res.data.result)
      let country = res.data.result.filter(country => {
        if (country.id == userDetails.countryId)
          return country
      })

      getProvinces(userDetails.countryId, userDetails)
      if (country.length > 0)
        setCountry(country[0].name)
      return res.data.result
    } catch (error) {
      console.error(error)
      return []
    }
  }

  const getProvinces = async (countryId, userDetails) => {
    try {
      let url = ""
      if (countryId) {
        url = `/settings/countries/${countryId}/provinces`
      }
      else {
        url = `/settings/countries/1/provinces`
      }

      const res = await axios.get(url)
      setProvinceData(res.data.result)
      let province = res.data.result.filter(prov => {
        if (prov.id == userDetails.provinceId)
          return prov
      })

      if (province.length > 0)
        setProvince(province[0].name)
      return res.data.result
    } catch (error) {
      console.error(error)
      return []
    }
  }

  useEffect(() => {
    getCountry(userDetails)
    getPostalCode(userDetails)
  }, [userDetails])

  useEffect(() => {
    if (currentUser.isPhoneConfirmed)
      setPhoneEditable(true)
  })

  const getPostalCodeFromAuto = (value) => {
    setInputValues({
      ...inputValues,
      postalcode: value
    })
  }

  const onSave = (e) => {
    e.preventDefault();

    let data = {
      "surname": inputValues.lastname,
      "name": inputValues.firstname,
      "avatar": "",
      "doorNumber": inputValues.doornr,
      "streetName": inputValues.streetname,
      "postalCodeId": inputValues.postalcode,
      "city": inputValues.city,
      "provinceId": inputValues.province,
      "countryId": inputValues.country,
      "id": 1
    }

    postUserDetails(data)
  }

  const onInputHandle = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    })
  }

  const onPhoneEdit = () => {
    setPhoneEditable(false)
  }

  return (
    <>
      <div class="order-right">
        <form class="profile-form" onSubmit={onSave}>
          <h1 class="font-20 font-demi mgb-60">BASIC INFORMATION</h1>
          <div class="row">
            <div class="col-md-6">
              <div class="label-top relative">
                <label>First name</label>
                <input type="text" placeholder="First name" name="firstname" onChange={onInputHandle} class="input-radius h56" value={inputValues.firstname} />
              </div>
            </div>
            <div class="col-md-6">
              <div class="label-top relative">
                <label>Last name</label>
                <input type="text" placeholder="Last name" class="input-radius h56" onChange={onInputHandle} name="lastname" value={inputValues.lastname} />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="label-top relative">
                <label>Street Name</label>
                <input type="text" placeholder="Street Name" name="streetname" onChange={onInputHandle} class="input-radius h56" value={inputValues.streetname} />
              </div>
            </div>
            <div class="col-md-6">
              <div class="label-top relative">
                <label>Door Nr</label>
                <input type="text" placeholder="Door Nr" class="input-radius h56" onChange={onInputHandle} name="doornr" value={inputValues.doornr} />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="label-top relative">
                <label>Postal Code</label>
                {postalCodeData.length & postalcode ?
                  <Autocomplete value={postalcode} suggestions={postalCodeData.map(code => code.zip)} getValue={getPostalCodeFromAuto} placeholder="Postal Code" /> :
                  <input type="text" placeholder="Province " class="input-radius h56" />
                }
              </div>
            </div>
            <div class="col-md-6">
              <div class="label-top relative">
                <label>City</label>
                <input type="text" value={inputValues.city} placeholder="City" name="city" class="input-radius h56" onChange={onInputHandle} />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="label-top relative">
                <label>Province</label>
                {provinceData && province ? 
                  <Autocomplete value={province} getValue={getProvinceFromAuto} placeholder="Province" suggestions={provinceData.map(province => province.name)} /> :
                  <input type="text" placeholder="Province " class="input-radius h56" />
                }
              </div>
            </div>
            <div class="col-md-6">
              <div class="label-top relative">
                <label>Country</label>
                {countryData && country ?
                  <Autocomplete value={country} getValue={getCountryFromAuto} placeholder="Country" suggestions={countryData.map(country => country.name)} /> :
                  <input type="text" placeholder="Country " class="input-radius h56" />
                }
              </div>
            </div>
          </div>
          <div class="label-top relative">
            <label>Phone number</label>
            <div class="box-telephone relative">
              <span class="area-code inflex-center-center">{inputValues.phoneHeader}</span>
              <input type="text" disabled={phoneEditable} placeholder="364 239 2830" onChange={onInputHandle} name='phonenumber' class="input-radius h56" value={inputValues.phonenumber} />
              {currentUser.isPhoneConfirmed && phoneEditable ?
                <button type="button" onClick={onPhoneEdit} class="vertify-button font-16 font-demi" data-target="#verify-phone" data-toggle="modal">Edit</button> :
                <button type="button" class="vertify-button font-16 font-demi" data-target="#verify-phone" data-toggle="modal">Vertify</button>
              }
            </div>
          </div>
          <div class="label-top relative">
            <label>E-mail</label>
            <input disabled type="text" placeholder="Infor@gmail.com" value={inputValues.email} name="email" onChange={onInputHandle} class="input-radius h56" />
          </div>
          <div class="text-right">
            <button type="submit" class="btn btn-yellow btn-h60 font-demi font-20 w230">SAVE</button>
          </div>
        </form>
      </div>
      <div class="order-right mgt-30 pd-55">
        <div class="update-progess">
          <h2 class="font-20 font-demi mgb-40">UPDATE PROFILE</h2>
          <ul class="progressbar-update">
            <li class="active">Add Address</li>
            <li className={currentUser.isPhoneConfirmed && "active"}>
              <div class="box-verphone text-center">
                <p>Vertify Phone</p>
                <p><button class="btn-default">Vertify</button></p>
              </div>
            </li>
            <li className={currentUser.isEmailConfirmed && "active"}>
              <div class="box-verphone text-center">
                <p>Confirm Mail</p>
                <p><button class="btn-default">Check</button></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default PageSectionBasicInfo;