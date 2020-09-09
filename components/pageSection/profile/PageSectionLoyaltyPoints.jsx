import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const PageSectionLoyaltyPoints = () => {
  return (
    <section>
      <div class="order-right">
        <div class="search-order flex-center-between">
          <div class="left-vox">
            <span class="font-20 font-demi">REWARDS</span>
          </div>
        </div>
        <div class="order-ul order-ul-reward">
          <ul class="font-demi font-16">
            <li>
              <span>You have:</span>
              <span class="text-yellow">0 Point</span>
            </li>
            <li></li>
            <li class="flex-center-between">
              <span>Converted Point:</span>
              <span class="text-yellow">0.00</span>
            </li>
            <li class="flex-center-between">
              <span>Total Point Rewarded:</span>
              <span class="text-yellow">0.00</span>
            </li>
            <li class="flex-center-between">
              <span>Standard:</span>
              <span>NewBee</span>
            </li>
            <li class="flex-center-between">
              <span>Expired Date</span>
              <span>Unlimited</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="order-right mgt-30">
        <form class="search-order flex-center-between">
          <div class="left-vox">
            <span class="font-20 font-demi">REWARDS</span>
            <div class="rank-note font-16 font-medium">You Ranked 11Th Place</div>
          </div>
          <div class="search-item">
            <div class="select-box relative">
              <select class="baris-blank">
                <option>Today</option>
                <option>All 1</option>
                <option>All 2</option>
              </select>
              <span class="arrow-abs ti-angle-down"></span>
            </div>
          </div>
        </form>
        <div class="order-table order-table-center table-responsive-md">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Top Rank</th>
                <th scope="col">Standard</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>01</th>
                <td>
                  <div class="flex-center user-flex">
                    <a href="" title="" class="img-circle"><img src="images/picture/user.png" alt="" title="" /> </a>
                    <h4 class="font-16 font-medium"><a href="" title="">Ackerman</a> </h4>
                  </div>
                </td>
                <td>Gold Member</td>
                <td>100 Points</td>
              </tr>
              <tr>
                <th>02</th>
                <td>
                  <div class="flex-center user-flex">
                    <a href="" title="" class="img-circle"><img src="images/picture/user.png" alt="" title="" /> </a>
                    <h4 class="font-16 font-medium"><a href="" title="">Levi</a> </h4>
                  </div>
                </td>
                <td>Gold Member</td>
                <td>100 Points</td>
              </tr>
              <tr>
                <th>03</th>
                <td>
                  <div class="flex-center user-flex">
                    <a href="" title="" class="img-circle"><img src="images/picture/user.png" alt="" title="" /> </a>
                    <h4 class="font-16 font-medium"><a href="" title="">Lee Lao Gia</a> </h4>
                  </div>
                </td>
                <td>Gold Member</td>
                <td>100 Points</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="pagi pagi-sm">
          <ul class="flex-center-center">
            <li class="active"><a href="" title=""><i class="ti-angle-double-left"></i> </a> </li>
            <li class="active"><a href="" title=""><i class="ti-angle-left"></i> </a> </li>
            <li class="current"><a href="" title="">1</a> </li>
            <li class=""><a href="" title="">2</a> </li>
            <li class=""><a href="" title="">3</a> </li>
            <li class=""><a href="" title="">4</a> </li>
            <li class=""><a href="" title="">5</a> </li>
            <li class=""><a href="" title="">...</a> </li>
            <li class="active"><a href="" title=""><i class="ti-angle-right"></i> </a> </li>
            <li class="active"><a href="" title=""><i class="ti-angle-double-right"></i> </a> </li>
          </ul>
        </div>
      </div>
      <div class="order-right mgt-30">
        <div class="search-order flex-center-between">
          <div class="left-vox">
            <span class="font-20 font-demi">RECEIVED POINT HISTORY</span>
          </div>
          <a href="" title="" class="btn btn-gray btn-h50 font-16 font-demi reward-policy">Reward Policy</a>
        </div>
        <div class="order-table table-responsive-md">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Transaction Detail</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>09/21/2019</th>
                <td>
                  <div class="aricl-more">Lorem ipsum dolor sit amet... <a href="" title="" class="font-demi">More</a> </div>
                </td>
                <td>10 Points</td>
              </tr>
              <tr>
                <th>09/21/2019</th>
                <td>
                  <div class="aricl-more">Lorem ipsum dolor sit amet... <a href="" title="" class="font-demi">More</a> </div>
                </td>
                <td>10 Points</td>
              </tr>
              <tr>
                <th>09/21/2019</th>
                <td>
                  <div class="aricl-more">Lorem ipsum dolor sit amet... <a href="" title="" class="font-demi">More</a> </div>
                </td>
                <td>10 Points</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default PageSectionLoyaltyPoints;