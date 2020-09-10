import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const PageSectionPaymentHistory = () => {
  return (
    <section>
      <div className="order-right">
        <form className="search-order flex-center-between">
          <span className="font-20 font-demi">RECENT TRANSACTION</span>
          <div className="select-fake">
            <div className="select-result"><span className="select-payment"><img src="/images/icon/icon-paypal.svg" alt="" title="" />PayPal</span></div>
            <ul className="list-payment">
              <li><span className="select-payment"><img src="/images/icon/icon-paypal.svg" alt="" title="" />PayPal</span></li>
              <li><span className="select-payment"><img src="/images/icon/icon-paypal.svg" alt="" title="" />Master Card</span></li>
            </ul>
          </div>
        </form>
        <div className="order-table order-table-center table-responsive-md">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Dish</th>
                <th scope="col">Order Date</th>
                <th scope="col">Total</th>
                <th scope="col">Payment Method</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Spaghetti</th>
                <td>09/21/2019</td>
                <td>$20</td>
                <td>PayPal</td>
                <td><span className="transaction-status transaction-complete">Complete</span> </td>
              </tr>
              <tr>
                <th>Spaghetti</th>
                <td>09/21/2019</td>
                <td>$20</td>
                <td>PayPal</td>
                <td><span className="transaction-status transaction-refund">Complete</span> </td>
              </tr>
              <tr>
                <th>Spaghetti</th>
                <td>09/21/2019</td>
                <td>$20</td>
                <td>PayPal</td>
                <td><span className="transaction-status transaction-complete">Complete</span> </td>
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
    </section>
  )
}

export default PageSectionPaymentHistory;