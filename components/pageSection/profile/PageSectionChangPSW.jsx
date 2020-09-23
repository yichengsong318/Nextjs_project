import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from '../../../lib/axios';
import { toast, ToastContainer } from 'react-nextjs-toast'

const PageSectionChangPSW = () => {
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

  const onChagePSW = (e) => {
    setError("")
    e.preventDefault()
    if (newPassowrd == confirmPassword) {
      var regexUppercase = /[a-z]/;
      var regexLowercase = /[A-Z]/;

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
      changePassword(newPassowrd, confirmPassword)
    } else {
      setError("Password does not match!")
    }
  }

  return (
    <div>
      <ToastContainer align={"right"} position={"top"} id="toast-comp-3" />
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
    </div>
  )
}

export default PageSectionChangPSW;