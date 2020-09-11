import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const PageSectionBasicInfo = () => {
  return (
    <div>
      <div class="order-right">
        <form class="profile-form">
          <h1 class="font-20 font-demi mgb-60">BASIC INFORMATION</h1>
          <div class="row">
            <div class="col-md-6">
              <div class="label-top relative">
                <label>First name</label>
                <input type="text" placeholder="First name" class="input-radius h56" value="Levi" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="label-top relative">
                <label>Last name</label>
                <input type="text" placeholder="Last name" class="input-radius h56" value="Ackerman" />
              </div>
            </div>
          </div>
          <div class="label-top relative">
            <label>Address</label>
            <div class="address-box">
              <div class="desc font-16 font-medium mgb-40">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</div>
              <div class="address-list">
                <span class="address-item">New York</span> <span class="address-item">Manhattan</span>
              </div>
            </div>
          </div>
          <button class="add-address-btn font-16 font-demi"><img src="/images/icon/icon-plus-circle.svg" /> Add another address </button>
          <div class="label-top relative">
            <label>Phone number</label>
            <div class="box-telephone relative">
              <span class="area-code inflex-center-center">+ 84</span>
              <input type="text" placeholder="" class="input-radius h56" value="364 239 2830" />
              <button type="button" class="vertify-button font-16 font-demi" data-target="#verify-phone" data-toggle="modal">Vertify</button>
            </div>
          </div>
          <div class="label-top relative">
            <label>E-mail</label>
            <input type="text" placeholder="Infor@gmail.com" class="input-radius h56" />
          </div>
          <div class="text-right"><button type="submit" class="btn btn-yellow btn-h60 font-demi font-20 w230">SAVE</button></div>
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
    </div>
  )
}

export default PageSectionBasicInfo;