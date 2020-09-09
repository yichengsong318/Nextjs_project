import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const PageSectionOrderHistory = () => {
  return (
    <section>
      <div class="order-right">
          <form class="search-order search-order-history">
            <div class="search-item">
              <label>Status</label>
              <div class="select-box relative">
                <select class="baris-blank">
                  <option>All</option>
                  <option>All 1</option>
                  <option>All 2</option>
                </select>
                <span class="arrow-abs ti-angle-down"></span>
              </div>
            </div>
            <div class="search-item search-date">
              <label>From Date</label>
              <div class="input-group date">
                <input type="text" class="baris-blank" placeholder="dd/mm/yyyy" />
                <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
              </div>
            </div>
            <div class="search-item search-date">
              <label>To Date</label>
              <div class="input-group date">
                <input type="text" class="baris-blank" placeholder="dd/mm/yyyy" />
                <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
              </div>
            </div>
            <div class="search-item search-item-button ">
              <label> </label>
              <button class="btn btn-h50 btn-yellow font-demi font-16  inflex-center-center">SEARCH</button>
            </div>
          </form>
          <div class="order-table order-table-center table-responsive-md">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Order Code</th>
                  <th scope="col">Shipper Name</th>
                  <th scope="col">Total</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
            <div class="no-found">No transaction has been found !</div>
          </div>
        </div>
    </section>
  )
}

export default PageSectionOrderHistory;