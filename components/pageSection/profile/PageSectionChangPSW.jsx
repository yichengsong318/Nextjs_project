import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const PageSectionChangPSW = () => {
  return (
    <div>
      <div class="order-right">
        <form class="profile-form">
          <h1 class="font-20 font-demi mgb-60">CHANGE PASSWORD</h1>
          <div class="row">
            <div class="col-md-10">
              <div class="label-top relative">
                <label>Current Password</label>
                <input type="password" placeholder="Current Password" class="input-radius h56"  />
              </div>
            </div>
            <div class="col-md-10">
              <div class="label-top relative">
                <label>Confirm Password</label>
                <input type="password" placeholder="Confirm Password" class="input-radius h56" />
              </div>
            </div>
            <div class="col-md-10">
              <div class="label-top relative">
                <label>New Password</label>
                <input type="password" placeholder="New Password" class="input-radius h56"  />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div class="text-right"><button type="submit" class="btn btn-yellow btn-h60 font-demi font-20 w230">SAVE</button></div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PageSectionChangPSW;