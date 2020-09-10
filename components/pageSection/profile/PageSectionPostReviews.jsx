import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const PageSectionPostReviews = () => {
  return (
    <section>
      <div className="order-right">
        <div className="search-order flex-center-between">
          <span className="font-20 font-demi">21 ACTIVITY</span>
          <div className="search-item flex-center">
            <div className="select-box relative mgr-15">
              <select className="baris-blank">
                <option>Provice</option>
                <option>All 1</option>
                <option>All 2</option>
              </select>
              <span className="arrow-abs ti-angle-down"></span>
            </div>
            <div className="select-box relative">
              <select className="baris-blank">
                <option>Lastest</option>
                <option>All 1</option>
                <option>All 2</option>
              </select>
              <span className="arrow-abs ti-angle-down"></span>
            </div>
          </div>
        </div>
        <div className="post-review">
          <div className="review-author flex">
            <span className="img-circle-60 mgr-15"><img src="/images/picture/user.png" alt="" title="" /> </span>
            <div className="author-info">
              <h2 className="font-20 font-demi">Ackerman</h2>
              <p className="au-location font-medium font-16">Starbuck Coffee NewYork</p>
              <p className="via font-medium font-16">via Android - 09/21/2019 - 22:00</p>
              <div className="star-rate">
                <a href="" title="" className="fa fa-star"></a>
                <a href="" title="" className="fa fa-star"></a>
                <a href="" title="" className="fa fa-star"></a>
                <a href="" title="" className="fa fa-star"></a>
                <a href="" title="" className="fa fa-star-o"></a>
              </div>
            </div>
          </div>
          <div className="post-text-wrapper">
            <div className="post-text desc font-16 font-medium">" Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidi dunt ut labore et dolore magna aliqua. "</div>
            <div className="save-post"><button className="btn btn-gray">Saved</button> </div>
          </div>
          <div className="post-action">
            <a href="" title="" className="active"><i className="fa fa-heart"></i><span>231 Likes</span> </a>
            <a href="" title=""><img src="/images/icon/comment.svg" alt="" title="" /><span>10 Comment</span> </a>
            <a href="" title=""><img src="/images/icon/respond-arrow.svg" alt="" title="" /><span>14 Share</span> </a>
          </div>
          <div className="post-comment flex-center mgb-30">
            <span className="img-circle mgr-15"><img src="/images/picture/user.png" alt="" title="" /> </span>
            <div className="label-top relative">
              <label>Comment</label>
              <input type="text" placeholder="Write something" className="input-radius h56" />
            </div>
          </div>
        </div>
      </div>
      <div className="order-right mgt-30">
        <div className="search-order flex-center-between">
          <span className="font-20 font-demi">21 ACTIVITY</span>
          <div className="search-item flex-center">
            <div className="select-box relative mgr-15">
              <select className="baris-blank">
                <option>Provice</option>
                <option>All 1</option>
                <option>All 2</option>
              </select>
              <span className="arrow-abs ti-angle-down"></span>
            </div>
            <div className="select-box relative">
              <select className="baris-blank">
                <option>Lastest</option>
                <option>All 1</option>
                <option>All 2</option>
              </select>
              <span className="arrow-abs ti-angle-down"></span>
            </div>
          </div>
        </div>
        <div className="post-review">
          <div className="review-author flex">
            <span className="img-circle-60 mgr-15"><img src="/images/picture/user.png" alt="" title="" /> </span>
            <div className="author-info">
              <h2 className="font-20 font-demi">Ackerman</h2>
              <p className="au-location font-medium font-16">Starbuck Coffee NewYork</p>
              <p className="via font-medium font-16">via Android - 09/21/2019 - 22:00</p>
              <div className="star-rate">
                <a href="" title="" className="fa fa-star"></a>
                <a href="" title="" className="fa fa-star"></a>
                <a href="" title="" className="fa fa-star"></a>
                <a href="" title="" className="fa fa-star"></a>
                <a href="" title="" className="fa fa-star-o"></a>
              </div>
            </div>
          </div>
          <div className="post-text-wrapper">
            <div className="post-text desc font-16 font-medium">" Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidi dunt ut labore et dolore magna aliqua. "</div>
            <div className="save-post"><button className="btn btn-gray">Saved</button> </div>
          </div>
          <div className="post-action">
            <a href="" title="" className="active"><i className="fa fa-heart"></i><span>231 Likes</span> </a>
            <a href="" title=""><img src="/images/icon/comment.svg" alt="" title="" /><span>10 Comment</span> </a>
            <a href="" title=""><img src="/images/icon/respond-arrow.svg" alt="" title="" /><span>14 Share</span> </a>
          </div>
          <div className="post-comment flex-center">
            <span className="img-circle mgr-15"><img src="/images/picture/user.png" alt="" title="" /> </span>
            <div className="label-top relative">
              <label>Comment</label>
              <input type="text" placeholder="Write something" className="input-radius h56" />
            </div>
          </div>
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

export default PageSectionPostReviews;