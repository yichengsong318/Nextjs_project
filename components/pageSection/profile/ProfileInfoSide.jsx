import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Link from 'next/link'
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

const ProfileInfoSide = (props) => {
  const { pageurl } = props;
  const dispatch = useDispatch();
  const [currentItem, setCurrentItem] = useState("");
  const [currentSubPage, setCurrentSubPage] = useState();
  const [activeList, setActiveList] = useState([]);
  const [userDetails, setUserDetails] = useState();
  const [avatar, setAvatar] = useState("");
  const { branchName, id: branchId } = useSelector((state) => state.root.currentBranch);

  const uploadImage = async (formData) => {
    try {
      const url = `customer/web/profile-service/me/avatar`;
      const res = await axios.post(url, formData)
      _process()
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const _process = async () => {
    const userDetail = await getUserDetails();
    setAvatar(userDetail.avatar)
    setUserDetails(userDetail);
  }

  useEffect(() => {
    if (!userDetails) {
      _process()
    }
  }, [userDetails])

  const changeTopic = (e) => {
    setCurrentItem(e.target.name)
  }

  const onLogout = () => {
    // dispatch(logOut());
    localStorage.removeItem("user")
  }

  const onUploadImage = (e) => {
    let file = e.target.files[0];
    const formData = new FormData();
    formData.append(
      "avatar",
      file,
      file.name
    );
    uploadImage(formData)
  }

  return (
    <main class="cd-main-content">
      <section class="profile-user wrapper-gray">
        <div class="container basic-profile">
          <div class="row">
            <div class="col-md-4">
              <div class="order-left">
                <div class="user-box">
                  <div class="text-center display-avata"><span class="img-circle"><img src={avatar} alt="" title="" /> </span></div>
                  <div class="text-center">
                    <label class="upload-avata relative">
                      <input type="file" class="hide-abs" onChange={onUploadImage} accept="image/*" />
                      <span><i class="fa fa-upload"></i> Upload</span>
                    </label>
                  </div>
                </div>
                <div class="order-nav">
                  <ul>
                    <li className={pageurl == "basic_info" ? "active" : ""}>
                      <Link href={`/${branchId}/me/basic_info`}>
                        <a onClick={changeTopic} name="BasicInfo" href="#" title="">Basic Information</a>
                      </Link>
                    </li>
                    <li className={pageurl == "change_password" ? "active" : ""}>
                      <Link href={`/${branchId}/me/change_password`}>
                        <a onClick={changeTopic} name="ChangePassword" href="#" title="">Change Password</a>
                      </Link>
                    </li>
                    <li><a onClick={onLogout} href={`/${branchId}`} title="">Log Out</a> </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-md-8">
              {props.children}
            </div>
          </div>
        </div>
      </section>
      <footer></footer>
    </main>
  )
}

export default ProfileInfoSide;