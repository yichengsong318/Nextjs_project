import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PageSectionOrderHistory from './PageSectionOrderHistory';
import PageSectionOrderTrack from './PageSectionOrderTrack';
import PageSectionCoupon from './PageSectionCoupon';
import PageSectionLoyaltyPoints from './PageSectionLoyaltyPoints';
import PageSectionPaymentHistory from './PageSectionPaymentHistory';
import PageSectionPostReviews from './PageSectionPostReviews';

const ProfileManagment = () => {
  const [currentItem, setCurrentItem] = useState("")
  const [currentSubPage, setCurrentSubPage] = useState()
  const [activeList, setActiveList] = useState([])

  const changeTopic = (e) => {
    // debugger
    setCurrentItem(e.target.name)
  }

  useEffect(() => {
    console.log(currentSubPage, "activelist")
    console.log(activeList,currentItem,"activelist")
    let listArray = []
    switch (currentItem) {
      case "orderHistory":
        setCurrentSubPage(<PageSectionOrderHistory />)
        listArray[0] = true
        setActiveList(listArray)
        break;
      case "loyaltyPoints":
        setCurrentSubPage(<PageSectionOrderTrack />)
        listArray[1] = true
        setActiveList(listArray)
        break;
      case "orderTrack":
        setCurrentSubPage(<PageSectionCoupon />)
        listArray[2] = true
        setActiveList(listArray)
        break;
      case "postReviews":
        setCurrentSubPage(<PageSectionLoyaltyPoints />)
        listArray[3] = true
        setActiveList(listArray)
        break;
      case "paymentHistory":
        setCurrentSubPage(<PageSectionPaymentHistory />)
        listArray[4] = true
        setActiveList(listArray)
        break;
      case "coupon":
        setCurrentSubPage(<PageSectionPostReviews />)
        listArray[5] = true
        setActiveList(listArray)
        break;
      default:
        setCurrentSubPage(<PageSectionOrderHistory />)
        listArray[0] = true
        setActiveList(listArray)
        break;
    }

  }, [currentItem])

  return (
    <main className="cd-main-content">
      <section className="banner profile-banner">
        <img src="/images/picture/banner-order.png" alt="" title="" />
      </section>
      <section className="order">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="order-left">
                <div className="user-box flex-center">
                  <span className="img-circle">
                    <img src="/images/picture/user.png" alt="" title="" />
                  </span>
                  <div className="user-right">
                    <h4 className="font-demi font-20">Ackerman</h4>
                    <p><a href="basic-profile.html" title="">Edit</a> </p>
                  </div>
                </div>
                <div className="order-nav">
                  <ul>
                    <li className={activeList[0]?"active":""}><a onClick={changeTopic} name="orderHistory" href="#" title="">Order History</a> </li>
                    <li className={activeList[1]?"active":""}><a onClick={changeTopic} name="loyaltyPoints" href="#" title="">Loyalty Points</a></li>
                    <li className={activeList[2]?"active":""}><a onClick={changeTopic} name="orderTrack" href="#" title="">Order Track</a></li>
                    <li className={activeList[3]?"active":""}><a onClick={changeTopic} name="postReviews" href="#" title="">Post Reviews</a></li>
                    <li className={activeList[4]?"active":""}><a onClick={changeTopic} name="paymentHistory" href="#" title="">Payment History</a></li>
                    <li className={activeList[5]?"active":""}><a onClick={changeTopic} name="coupon" href="#" title="">Coupon</a></li>
                    <li className=""><a onClick={changeTopic} name="logout" href="#" title="">LOGOUT</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              {currentSubPage}
            </div>
          </div>
        </div>
      </section>
      <footer></footer>
    </main>
  )
}

export default ProfileManagment;
