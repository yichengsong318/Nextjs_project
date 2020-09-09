import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const PageSectionPostReviews = () => {
  return (
    <section>
      <div class="order-right">
        <div class="search-order flex-center-between">
          <span class="font-20 font-demi">21 ACTIVITY</span>
          <div class="search-item flex-center">
            <div class="select-box relative mgr-15">
              <select class="baris-blank">
                <option>Provice</option>
                <option>All 1</option>
                <option>All 2</option>
              </select>
              <span class="arrow-abs ti-angle-down"></span>
            </div>
            <div class="select-box relative">
              <select class="baris-blank">
                <option>Lastest</option>
                <option>All 1</option>
                <option>All 2</option>
              </select>
              <span class="arrow-abs ti-angle-down"></span>
            </div>
          </div>
        </div>
        <div class="post-review">
          <div class="review-author flex">
            <span class="img-circle-60 mgr-15"><img src="images/picture/user.png" alt="" title="" /> </span>
            <div class="author-info">
              <h2 class="font-20 font-demi">Ackerman</h2>
              <p class="au-location font-medium font-16">Starbuck Coffee NewYork</p>
              <p class="via font-medium font-16">via Android - 09/21/2019 - 22:00</p>
              <div class="star-rate">
                <a href="" title="" class="fa fa-star"></a>
                <a href="" title="" class="fa fa-star"></a>
                <a href="" title="" class="fa fa-star"></a>
                <a href="" title="" class="fa fa-star"></a>
                <a href="" title="" class="fa fa-star-o"></a>
              </div>
            </div>
          </div>
          <div class="post-text-wrapper">
            <div class="post-text desc font-16 font-medium">" Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidi dunt ut labore et dolore magna aliqua. "</div>
            <div class="save-post"><button class="btn btn-gray">Saved</button> </div>
          </div>
          <div class="post-action">
            <a href="" title="" class="active"><i class="fa fa-heart"></i><span>231 Likes</span> </a>
            <a href="" title=""><img src="images/icon/comment.svg" alt="" title="" /><span>10 Comment</span> </a>
            <a href="" title=""><img src="images/icon/respond-arrow.svg" alt="" title="" /><span>14 Share</span> </a>
          </div>
          <div class="post-comment flex-center mgb-30">
            <span class="img-circle mgr-15"><img src="images/picture/user.png" alt="" title="" /> </span>
            <div class="label-top relative">
              <label>Comment</label>
              <input type="text" placeholder="Write something" class="input-radius h56" />
            </div>
          </div>
        </div>
      </div>
      <div class="order-right mgt-30">
        <div class="search-order flex-center-between">
          <span class="font-20 font-demi">21 ACTIVITY</span>
          <div class="search-item flex-center">
            <div class="select-box relative mgr-15">
              <select class="baris-blank">
                <option>Provice</option>
                <option>All 1</option>
                <option>All 2</option>
              </select>
              <span class="arrow-abs ti-angle-down"></span>
            </div>
            <div class="select-box relative">
              <select class="baris-blank">
                <option>Lastest</option>
                <option>All 1</option>
                <option>All 2</option>
              </select>
              <span class="arrow-abs ti-angle-down"></span>
            </div>
          </div>
        </div>
        <div class="post-review">
          <div class="review-author flex">
            <span class="img-circle-60 mgr-15"><img src="images/picture/user.png" alt="" title="" /> </span>
            <div class="author-info">
              <h2 class="font-20 font-demi">Ackerman</h2>
              <p class="au-location font-medium font-16">Starbuck Coffee NewYork</p>
              <p class="via font-medium font-16">via Android - 09/21/2019 - 22:00</p>
              <div class="star-rate">
                <a href="" title="" class="fa fa-star"></a>
                <a href="" title="" class="fa fa-star"></a>
                <a href="" title="" class="fa fa-star"></a>
                <a href="" title="" class="fa fa-star"></a>
                <a href="" title="" class="fa fa-star-o"></a>
              </div>
            </div>
          </div>
          <div class="post-text-wrapper">
            <div class="post-text desc font-16 font-medium">" Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidi dunt ut labore et dolore magna aliqua. "</div>
            <div class="save-post"><button class="btn btn-gray">Saved</button> </div>
          </div>
          <div class="post-action">
            <a href="" title="" class="active"><i class="fa fa-heart"></i><span>231 Likes</span> </a>
            <a href="" title=""><img src="images/icon/comment.svg" alt="" title="" /><span>10 Comment</span> </a>
            <a href="" title=""><img src="images/icon/respond-arrow.svg" alt="" title="" /><span>14 Share</span> </a>
          </div>
          <div class="post-comment flex-center">
            <span class="img-circle mgr-15"><img src="images/picture/user.png" alt="" title="" /> </span>
            <div class="label-top relative">
              <label>Comment</label>
              <input type="text" placeholder="Write something" class="input-radius h56" />
            </div>
          </div>
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

export default PageSectionPostReviews;