import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const PageSectionOrderTrack = () => {
  return (
    <section>
      <div class="order-right">
        <div class="order-tracking">
          <div class="progress-tracking">
            <h1 class="font-demi font-20 mgb-40">PROGRESS</h1>
            <div class="step-head">
              <ul class="progressbar">
                <li class="active">
                  <span class="progress-img"><img src="images/icon/lemon.svg" alt="" title="" /> </span>
                  <p>Prepare</p>
                </li>
                <li>
                  <span class="progress-img"><img src="images/icon/cutlery.svg" alt="" title="" /></span>
                  <p>Cook</p>
                </li>
                <li>
                  <span class="progress-img"><img src="images/icon/milk.svg" alt="" title="" /></span>
                  <p>Pack</p>
                </li>
                <li onclick="window.location.href= base_url + 'order-tracking-on-it-way.html'">
                  <span class="progress-img"><img src="images/icon/bag-delivery.svg" alt="" title="" /></span>
                  <p>On Its Way</p>
                </li>
                <li onclick="window.location.href= base_url + 'order-tracking-deliver.html'">
                  <span class="progress-img"><img src="images/icon/check.svg" alt="" title="" /></span>
                  <p>Delivered</p>
                </li>
              </ul>
            </div>
          </div>
          <div class="cover-tracking text-center">
            <p class="mgb-30"><img src="images/picture/image-1.png" alt="" title="" /> </p>
            <div class="max-320 font-18 font-demi">Do you know that we hand-make 200 pizza dough every day?</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PageSectionOrderTrack;