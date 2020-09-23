import React, { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import DefaultLayout from '../../../layouts/DefaultLayout';
import TheHeader from '../../../components/header/TheHeader';
import TheFooter from '../../../components/footer/TheFooter';
import { useTranslation } from 'react-i18next';
import axios from '../../../lib/axios';
import Autocomplete from '../../../components/element/Autocomplete';
import ProfileInfoSide from '../../../components/pageSection/profile/ProfileInfoSide';
import usePageOnLoad from '../../../hooks/page/usePageOnLoad';
import useUserFetchCurrentUser from '../../../hooks/user/useUserFetchCurrentUser';
import { toast, ToastContainer } from 'react-nextjs-toast';
import _ from 'lodash';

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

const getSettings = async () => {
  try {
    const url = `settings?mediaTypeFilters=LOGO&mediaTypeFilters=FAVI_ICON&mediaTypeFilters=MOBILE_PROFILE_IMAGE&mediaTypeFilters=MOBILE_START_SCREEN&mediaTypeFilters=MOBILE_WELCOME_SCREEN`;
    const response = await axios.get(url);

    return response.data.result;
  } catch (error) {
    console.error(error);

    return [];
  }
};

export async function getServerSideProps(context) {
  const branchId = context.params.branch;
  const settings = await getSettings();

  // get current branch
  const { branches } = settings;
  const currentBranch = branches.filter((branch) => {
    return branch.id === parseInt(branchId);
  })[0];
  // if branch is not found
  if (_.isNil(currentBranch)) {
    context.res.statusCode = 404;
    context.res.end('Not found');
    return;
  }

  return {
    props: {
      settings,
      currentBranch,
    },
  };
}

export default function Index(props) {
  const router = useRouter()
  useUserFetchCurrentUser();
  usePageOnLoad(props);
  const { currentBranch } = props;

  const [userDetails, setUserDetails] = useState();
  const [newPassowrd, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("");

  const changePassword = async (newPassowrd, confirmPassword) => {
    const url = `/customer/change-password`;
    try {
      var res = await axios.post(url, {
        "password": newPassowrd,
        "confirmPassword": confirmPassword
      })
      if (res.data.success) {
        toast.notify("successfully changed password", {
          duration: 5,
          position: "top",
          targetId: "toast-comp-3"
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const _process = async () => {
    const userDetails = await getUserDetails();
    setUserDetails(userDetails);
    if (userDetails) {

    }
  }

  useEffect(() => {
    if (!userDetails) {
      _process()
    }
  }, [userDetails])

  const onChagePSW = (e) => {
    setError("")
    e.preventDefault()
    if (newPassowrd == confirmPassword) {
      var regexUppercase = /[a-z]/;
      var regexLowercase = /[A-Z]/;
      var regexSpecial = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

      if (newPassowrd.length < 6 || newPassowrd.length > 20) {
        setError("Passwords must be at least 6 characters.")
        return
      }
      if (!regexLowercase.test(newPassowrd)) {
        setError("Passwords must have at least one uppercase ('A'-'Z').")
        return
      }
      if (!regexUppercase.test(newPassowrd)) {
        setError("Passwords must have at least one lowercase ('a'-'z').")
        return
      }
      if (!regexSpecial.test(newPassowrd)) {
        setError("Passwords must have at least one non alphanumeric character")
      }
      changePassword(newPassowrd, confirmPassword)
    } else {
      setError("Password does not match!")
    }
  }

  return (
    <Fragment>
      <ToastContainer align={"right"} position={"top"} id="toast-comp-3" />
      <DefaultLayout>
        <TheHeader />
        <ProfileInfoSide pageurl="change_password">
          <div class="order-right">
            <form class="profile-form" onSubmit={onChagePSW}>
              <h1 class="font-20 font-demi mgb-60">CHANGE PASSWORD</h1>
              <div class="row">
                <div class="col-md-10">
                  <div class="label-top relative">
                    <label>New Password</label>
                    <input type="password" placeholder="New Password" value={newPassowrd} onChange={e => setNewPassword(e.target.value)} class="input-radius h56" />
                  </div>
                </div>
                <div class="col-md-10">
                  <div class="label-top relative">
                    <label>Confirm Password</label>
                    <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} class="input-radius h56" />
                  </div>
                </div>
                <div class="col-md-10">
                  <div style={{ color: "red" }}>{error}</div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div class="text-right"><button type="submit" class="btn btn-yellow btn-h60 font-demi font-20 w230">SAVE</button></div>
                </div>
              </div>
            </form>
          </div>
        </ProfileInfoSide>
        <TheFooter />
      </DefaultLayout>
    </Fragment>
  )
}
