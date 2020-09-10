import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const PageSectionCoupon = () => {
  return (
    <section>
      <div className="order-right">
        <form className="search-order flex-center-between">
          <span className="font-20 font-demi">COUPON</span>
          <div className="search-item">
            <div className="select-box relative">
              <select className="baris-blank">
                <option>All</option>
                <option>All 1</option>
                <option>All 2</option>
              </select>
              <span className="arrow-abs ti-angle-down"></span>
            </div>
          </div>
        </form>
        <div className="order-table order-table-center table-responsive-md">
          <table className="table table-striped">
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
                <td><a href="" title="" className="link-underline" data-toggle="modal" data-target="#coupon-detail">Detail</a> </td>
              </tr>
              <tr>
                <th>AB233</th>
                <td>09/21/2019</td>
                <td>New York</td>
                <td>50%</td>
                <td><a href="" title="" className="link-underline" data-toggle="modal" data-target="#coupon-detail">Detail</a> </td>
              </tr>
              <tr>
                <th>AB233</th>
                <td>09/21/2019</td>
                <td>New York</td>
                <td>50%</td>
                <td><a href="" title="" className="link-underline" data-toggle="modal" data-target="#coupon-detail">Detail</a> </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="pagi pagi-sm">
          <ul className="flex-center-center">
            <li className="active"><a href="" title=""><i className="ti-angle-double-left"></i> </a> </li>
            <li className="active"><a href="" title=""><i className="ti-angle-left"></i> </a> </li>
            <li className="current"><a href="" title="">1</a> </li>
            <li className=""><a href="" title="">2</a> </li>
            <li className=""><a href="" title="">3</a> </li>
            <li className=""><a href="" title="">4</a> </li>
            <li className=""><a href="" title="">5</a> </li>
            <li className=""><a href="" title="">...</a> </li>
            <li className="active"><a href="" title=""><i className="ti-angle-right"></i> </a> </li>
            <li className="active"><a href="" title=""><i className="ti-angle-double-right"></i> </a> </li>
          </ul>
        </div>
      </div>
      <div className="order-right mgt-30">
        <form className="invited">
          <h3 className="font-20 font-demi mgb-40">INVITED FRIEND</h3>
          <div className="label-top relative">
            <label>Phone number</label>
            <div className="box-telephone relative">
              <span className="area-code inflex-center-center">+ 84</span>
              <input type="text" placeholder="" className="input-radius h56" />
            </div>
          </div>
          <div className="label-top relative">
            <label>E-mail</label>
            <input type="text" placeholder="Infor@gmail.com" className="input-radius h56" />
          </div>
          <div className="text-right"><button type="submit" className="btn btn-yellow btn-h60 font-demi font-20 w230">SEND</button></div>
        </form>
      </div>
    </section>
  )
}

export default PageSectionCoupon;