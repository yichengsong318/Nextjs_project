import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PageSectionOrderHistory from './PageSectionOrderHistory';
import PageSectionOrderTrack from './PageSectionOrderTrack';
import PageSectionCoupon from './PageSectionCoupon';
import PageSectionLoyaltyPoints from './PageSectionLoyaltyPoints';
import PageSectionPaymentHistory from './PageSectionPaymentHistory';
import PageSectionPostReviews from './PageSectionPostReviews';

const ProfileManagment = () => {

  const changeTopic = (e) => {

  }
  return (
    <main class="cd-main-content">
      <section class="banner">
        <img src="../../../assets/images/picture/banner-order.png" alt="" title="" />
      </section>
      <section class="order">
        <div class="container">
          <div class="row">
            <div class="col-md-4">
              <div class="order-left">
                <div class="user-box flex-center">
                  <span class="img-circle"><img src="images/picture/user.png" alt="" title="" /> </span>
                  <div class="user-right">
                    <h4 class="font-demi font-20">Ackerman</h4>
                    <p><a href="basic-profile.html" title="">Edit</a> </p>
                  </div>
                </div>
                <div class="order-nav">
                  <ul>
                    <li onClick={changeTopic} className="active"><a href="#" title="">Order History</a> </li>
                    <li onClick={changeTopic} className=""><a href="#" title="">Loyalty Points</a></li>
                    <li onClick={changeTopic} className=""><a href="#" title="">Order Track</a></li>
                    <li onClick={changeTopic} className=""><a href="#" title="">Post Reviews</a></li>
                    <li onClick={changeTopic} className=""><a href="#" title="">Payment History</a></li>
                    <li onClick={changeTopic} className=""><a href="#" title="">Coupon</a></li>
                    <li onClick={changeTopic} className=""><a href="#" title="">LOGOUT</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-md-8">
              {/* <PageSectionOrderHistory /> */}
              {/* <PageSectionOrderTrack /> */}
              {/* <PageSectionCoupon /> */}
              {/* <PageSectionLoyaltyPoints /> */}
              {/* <PageSectionPaymentHistory /> */}
              <PageSectionPostReviews/>
            </div>
          </div>
        </div>
      </section>
      <footer></footer>
    </main>
  )
}

export default ProfileManagment;
