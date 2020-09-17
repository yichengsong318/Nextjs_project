import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import PageSectionBasicInfo from './PageSectionBasicInfo'
import PageSectionChangPSW from './PageSectionChangPSW';
import axios from '../../../lib/axios';
import { logOut } from '../../../store/actions/authentication.actions';

const getUserDetails = async () => {
  try {
    const url = "/customer/web/profile-service/me";
    const response = await axios.get(url);
    return response.data.result;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const BasicProfile = () => {
  const dispatch = useDispatch();
  const [currentItem, setCurrentItem] = useState("")
  const [currentSubPage, setCurrentSubPage] = useState()
  const [activeList, setActiveList] = useState([])
  const [userDetails, setUserDetails] = useState()
  const { branchName, id: branchId } = useSelector((state) => state.root.currentBranch);

  const _process = async () => {
    const userDetail = await getUserDetails()
    setUserDetails(userDetail)
  }

  useEffect(() => {
      if(!userDetails){
        _process()
      }
  },[userDetails])

  const changeTopic = (e) => {
    setCurrentItem(e.target.name)
  }

  const onLogout = () => {
    // dispatch(logOut());
    localStorage.removeItem("user")
  }

  useEffect(() => {
    console.log(currentSubPage, "activelist")
    console.log(activeList, currentItem, "activelist")
    let listArray = []
    switch (currentItem) {
      case "BasicInfo":
        setCurrentSubPage(<PageSectionBasicInfo userDetails = {userDetails}/>)
        listArray[0] = true
        setActiveList(listArray)
        break;
      case "ChangePassword":
        setCurrentSubPage(<PageSectionChangPSW />)
        listArray[1] = true
        setActiveList(listArray)
        break;
      default:
        setCurrentSubPage(<PageSectionBasicInfo userDetails = {userDetails}/>)
        listArray[0] = true
        setActiveList(listArray)
        break;
    }
  }, [currentItem, userDetails])

  return (
    <main class="cd-main-content">
      <section class="profile-user wrapper-gray">
        <div class="container basic-profile">
          <div class="row">
            <div class="col-md-4">
              <div class="order-left">
                <div class="user-box">
                  <div class="text-center display-avata"><span class="img-circle"><img src="/images/picture/avata-16.jpg" alt="" title="" /> </span></div>
                  <div class="text-center">
                    <label class="upload-avata relative">
                      <input type="file" class="hide-abs" />
                      <span><i class="fa fa-upload"></i> Upload</span>
                    </label>
                  </div>
                </div>
                <div class="order-nav">
                  <ul>
                    <li className={activeList[0] ? "active" : ""}><a onClick={changeTopic} name="BasicInfo" href="#" title="">Basic Information</a> </li>
                    <li className={activeList[1] ? "active" : ""}><a onClick={changeTopic} name="ChangePassword" href="#" title="">Change Password</a> </li>
                    <li><a onClick={onLogout} href={`/${branchId}`} title="">Log Out</a> </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-md-8">
              {currentSubPage && userDetails && currentSubPage}
            </div>
          </div>
        </div>
      </section>
      <footer></footer>
    </main>
  )
}

export default BasicProfile;