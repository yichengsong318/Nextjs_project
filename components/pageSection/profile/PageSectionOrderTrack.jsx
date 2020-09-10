import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const PageSectionOrderTrack = () => {
  return (
    <section>
      <div className="order-right">
        <div className="order-tracking">
          <div className="progress-tracking">
            <h1 className="font-demi font-20 mgb-40">PROGRESS</h1>
            <div className="step-head">
              <ul className="progressbar">
                <li className="active">
                  <span className="progress-img"><img src="/images/icon/lemon.svg" alt="" title="" /> </span>
                  <p>Prepare</p>
                </li>
                <li>
                  <span className="progress-img"><img src="/images/icon/cutlery.svg" alt="" title="" /></span>
                  <p>Cook</p>
                </li>
                <li>
                  <span className="progress-img"><img src="/images/icon/milk.svg" alt="" title="" /></span>
                  <p>Pack</p>
                </li>
                <li onclick="window.location.href= base_url + 'order-tracking-on-it-way.html'">
                  <span className="progress-img"><img src="/images/icon/bag-delivery.svg" alt="" title="" /></span>
                  <p>On Its Way</p>
                </li>
                <li onclick="window.location.href= base_url + 'order-tracking-deliver.html'">
                  <span className="progress-img"><img src="/images/icon/check.svg" alt="" title="" /></span>
                  <p>Delivered</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="cover-tracking text-center">
            <p className="mgb-30"><img src="/images/picture/image-1.png" alt="" title="" /> </p>
            <div className="max-320 font-18 font-demi">Do you know that we hand-make 200 pizza dough every day?</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PageSectionOrderTrack;