import React, { useContext} from "react";
import Style from "./Profile.module.css";
import { UserTokenContext } from "../../Context/UserTokenContext";
import profile from "../../Assets/Images/1612122535555.png";
import { Helmet } from "react-helmet";

export default function Profile() {
  let { UserData } = useContext(UserTokenContext);

  return (
    <>
      <Helmet>
        <title>User Info</title>
        <meta name="description" content="User Info Page" />
      </Helmet>

      <div
        className={`${"row justify-content-center align-items-center"} ${
          Style.profile
        }`}
      >
        <div className="col-md-6">
          <h2 className=" fw-bolder">
            Hi,
            <span className="text-main">
              {UserData?.name.split(" ").slice(0, 2).join(" ")}!
            </span>
          </h2>
          <img src={profile} className="w-100" alt="profile image" />
        </div>
        <div className="col-md-6">
          <div className="mt-2">
            <h2 className={`${" fw-bolder"} ${Style.logo}`}>
              {UserData?.name.split("").slice(0, 1).join(" ")}
              {UserData?.name
                .split(" ")
                .slice(1, 2)
                .join(" ")
                .split("")
                .slice(0, 1)
                .join(" ")}
            </h2>
          </div>
          <div className="  mt-5 ">
            <div className="">
              <h5 className="fw-bold ">
                Name : <span className="text-main">{UserData?.name}</span>
              </h5>
            </div>
            <div className="">
              <h5 className=" fw-bold">
                Email : <span className="text-main"> {UserData?.email}</span>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
{
  /* <h2 className=" fw-bolder">Hi, <span className="text-main">{UserData?.name.split(" ").slice(0, 2).join(" ")}!</span></h2>
      <div className={`${"row"} ${Style.profile}`}>
        <div className={`${"col-md-12"}`}>
          <h2 className={`${" fw-bolder"} ${Style.logo}`}>
            {UserData?.name.split("").slice(0, 1).join(" ")}
            {UserData?.name
              .split(" ")
              .slice(1, 2)
              .join(" ")
              .split("")
              .slice(0, 1)
              .join(" ")}
          </h2>
        </div>
        <div className="row mt-2  justify-content-start align-items-center">
          <div className="col-md-6">
            <h5 className="fw-bold ">
              Name : <span className="text-main">{UserData?.name}</span>
            </h5>
          </div>
          <div className="col-md-6">
            <h5 className=" fw-bold">
              Email : <span className="text-main"> {UserData?.email}</span>
            </h5>
          </div>
          <div className="col-md-6">
            <h5 className=" fw-bold">
              Email : <span className="text-main"> {UserData?.email}</span>
            </h5>
          </div>
        </div>
      </div>*/
}
