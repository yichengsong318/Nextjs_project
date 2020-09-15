import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { useTranslation } from 'react-i18next';
import PageSectionOrderTrack from './PageSectionOrderTrack';
import PageSectionLoyaltyPoints from './PageSectionLoyaltyPoints';
import PageSectionPostReviews from './PageSectionPostReviews';
import PageSectionCoupon from './PageSectionCoupon';

const ProfileManagment = (props) => {
  const { currentBranch } = props
  const [currentItem, setCurrentItem] = useState("")
  const [currentSubPage, setCurrentSubPage] = useState()
  const [activeList, setActiveList] = useState([])
  const { branchName, id: branchId } = useSelector((state) => state.root.currentBranch);

  const changeTopic = (e) => {
    // debugger
    setCurrentItem(e.target.name)
  }

  useEffect(() => {
    console.log(currentSubPage, "activelist")
    console.log(activeList,currentItem,"activelist")
    let listArray = []
    switch (currentItem) {
      case "orderTrack":
        setCurrentSubPage(<PageSectionOrderTrack currentBranch = {currentBranch}/>)
        listArray[0] = true
        setActiveList(listArray)
        break;
      case "loyaltyPoints":
        setCurrentSubPage(<PageSectionLoyaltyPoints />)
        listArray[1] = true
        setActiveList(listArray)
        break;
      case "coupon":
        setCurrentSubPage(<PageSectionPostReviews />)
        listArray[2] = true
        setActiveList(listArray)
        break;
      default:
        setCurrentSubPage(<PageSectionOrderTrack />)
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
                    <p>
                      <Link href={`/${branchId}/profile-management`}>
												<a>Edit</a>
											</Link>
                    </p>
                  </div>
                </div>
                <div className="order-nav">
                  <ul>
                    <li className={activeList[0]?"active":""}><a onClick={changeTopic} name="orderTrack" href="#" title="">Order History</a> </li>
                    <li className={activeList[1]?"active":""}><a onClick={changeTopic} name="loyaltyPoints" href="#" title="">Loyalty Points</a></li>
                    <li className={activeList[2]?"active":""}><a onClick={changeTopic} name="coupon" href="#" title="">Coupon</a></li>
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
