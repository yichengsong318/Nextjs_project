import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const PageSectionPaymentHistory = () => {
  return (
    <section>
      <div class="order-right">
        <form class="search-order flex-center-between">
          <span class="font-20 font-demi">RECENT TRANSACTION</span>
          <div class="select-fake">
            <div class="select-result"><span class="select-payment"><img src="images/icon/icon-paypal.svg" alt="" title="" />PayPal</span></div>
            <ul class="list-payment">
              <li><span class="select-payment"><img src="images/icon/icon-paypal.svg" alt="" title="" />PayPal</span></li>
              <li><span class="select-payment"><img src="images/icon/icon-paypal.svg" alt="" title="" />Master Card</span></li>
            </ul>
          </div>
        </form>
        <div class="order-table order-table-center table-responsive-md">
          <table class="table table-striped">
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
                <td><span class="transaction-status transaction-complete">Complete</span> </td>
              </tr>
              <tr>
                <th>Spaghetti</th>
                <td>09/21/2019</td>
                <td>$20</td>
                <td>PayPal</td>
                <td><span class="transaction-status transaction-refund">Complete</span> </td>
              </tr>
              <tr>
                <th>Spaghetti</th>
                <td>09/21/2019</td>
                <td>$20</td>
                <td>PayPal</td>
                <td><span class="transaction-status transaction-complete">Complete</span> </td>
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
    </section>
  )
}

export default PageSectionPaymentHistory;