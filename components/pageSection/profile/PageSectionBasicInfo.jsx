import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';

const PageSectionBasicInfo = (props) => {
  const { userDetails } = props
  const [inputValues, setInputValues] = useState({
    firstname: "", lastname: "", streetname: "", doornr: "", postalcode: "",
    city: "", province: "", ountry: "", phonenumber: "", email: "",
  })
  const [shine, setShine] = useState(true)

  useEffect(() => {
    if (userDetails) {
      setInputValues({
        firstname: userDetails.name,
        lastname: userDetails.surname,
        streetname: userDetails.streetName,
        doornr: userDetails.doorNumber,
        postalcode: userDetails.postalCodeId,
        city: userDetails.city,
        province: userDetails.provinceId,
        country: userDetails.countryId,
        phonenumber: userDetails.phoneNumber,
        email: userDetails.email
      })
    }
  }, [userDetails])

  const onSave = (e) => {
    e.preventDefault();
  }

  const onInputHandle = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    })
  }
debugger
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
                <input type="text" placeholder="Postal Code" name="postalcode" onChange={onInputHandle} class="input-radius h56" value={inputValues.postalcode} />
              </div>
            </div>
            <div class="col-md-6">
              <div class="label-top relative">
                <label>City</label>
                <input type="text" placeholder="City" class="input-radius h56" onChange={onInputHandle} name="city" value={inputValues.city} />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="label-top relative">
                <label>Province</label>
                <input type="text" placeholder="Province" name="province" onChange={onInputHandle} class="input-radius h56" value={inputValues.province} />
              </div>
            </div>
            <div class="col-md-6">
              <div class="label-top relative">
                <label>Country</label>
                <input type="text" placeholder="Country" class="input-radius h56" onChange={onInputHandle} name="country" value={inputValues.country} />
              </div>
            </div>
          </div>
          <div class="label-top relative">
            <label>Phone number</label>
            <div class="box-telephone relative">
              <span class="area-code inflex-center-center">{inputValues.phonenumber}</span>
              <input type="text" placeholder="364 239 2830" onChange={onInputHandle} name='phonenumber' class="input-radius h56" value={inputValues.phonenumber} />
              <button type="button" class="vertify-button font-16 font-demi" data-target="#verify-phone" data-toggle="modal">Vertify</button>
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
            <li>
              <div class="box-verphone text-center">
                <p>Vertify Phone</p>
                <p><button class="btn-default">Vertify</button></p>
              </div>
            </li>
            <li>
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