import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const PageSectionCoupon = () => {
  return (
    <section>
      <div class="order-right">
        <form class="search-order flex-center-between">
          <span class="font-20 font-demi">COUPON</span>
          <div class="search-item">
            <div class="select-box relative">
              <select class="baris-blank">
                <option>All</option>
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
                <th scope="col">Code</th>
                <th scope="col">Expired Date</th>
                <th scope="col">Branch</th>
                <th scope="col">Discount Rate</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>AB233</th>
                <td>09/21/2019</td>
                <td>New York</td>
                <td>50%</td>
                <td><a href="" title="" class="link-underline" data-toggle="modal" data-target="#coupon-detail">Detail</a> </td>
              </tr>
              <tr>
                <th>AB233</th>
                <td>09/21/2019</td>
                <td>New York</td>
                <td>50%</td>
                <td><a href="" title="" class="link-underline" data-toggle="modal" data-target="#coupon-detail">Detail</a> </td>
              </tr>
              <tr>
                <th>AB233</th>
                <td>09/21/2019</td>
                <td>New York</td>
                <td>50%</td>
                <td><a href="" title="" class="link-underline" data-toggle="modal" data-target="#coupon-detail">Detail</a> </td>
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
        <form class="invited">
          <h3 class="font-20 font-demi mgb-40">INVITED FRIEND</h3>
          <div class="label-top relative">
            <label>Phone number</label>
            <div class="box-telephone relative">
              <span class="area-code inflex-center-center">+ 84</span>
              <input type="text" placeholder="" class="input-radius h56" />
            </div>
          </div>
          <div class="label-top relative">
            <label>E-mail</label>
            <input type="text" placeholder="Infor@gmail.com" class="input-radius h56" />
          </div>
          <div class="text-right"><button type="submit" class="btn btn-yellow btn-h60 font-demi font-20 w230">SEND</button></div>
        </form>
      </div>
    </section>
  )
}

export default PageSectionCoupon;