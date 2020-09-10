import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const PageSectionOrderHistory = () => {
  return (
    <section>
      <div className="order-right">
          <form className="search-order search-order-history">
            <div className="search-item">
              <label>Status</label>
              <div className="select-box relative">
                <select className="baris-blank">
                  <option>All</option>
                  <option>All 1</option>
                  <option>All 2</option>
                </select>
                <span className="arrow-abs ti-angle-down"></span>
              </div>
            </div>
            <div className="search-item search-date">
              <label>From Date</label>
              <div className="input-group date">
                <input type="text" className="baris-blank" placeholder="dd/mm/yyyy" />
                <span className="input-group-addon"><i className="fa fa-calendar"></i></span>
              </div>
            </div>
            <div className="search-item search-date">
              <label>To Date</label>
              <div className="input-group date">
                <input type="text" className="baris-blank" placeholder="dd/mm/yyyy" />
                <span className="input-group-addon"><i className="fa fa-calendar"></i></span>
              </div>
            </div>
            <div className="search-item search-item-button ">
              <label> </label>
              <button className="btn btn-h50 btn-yellow font-demi font-16  inflex-center-center">SEARCH</button>
            </div>
          </form>
          <div className="order-table order-table-center table-responsive-md">
            <table className="table table-striped">
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
            <div className="no-found">No transaction has been found !</div>
          </div>
        </div>
    </section>
  )
}

export default PageSectionOrderHistory;