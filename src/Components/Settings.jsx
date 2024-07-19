import React, { useEffect, useState } from "react";
import { HiOutlinePencil } from "react-icons/hi2";
import { IoSaveOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {
  getUserByAuth,
  UpdateProfile,
  UploadProfileImg,
} from "../services/services";
import { BaseURL } from "../utils/const";
import { BsCurrencyDollar } from "react-icons/bs";
import { Modal, Button } from "antd";

export const HandleImageUpload = async (e, setImageUrl, setBranchLogo) => {
  const uploadBranchLogo = e.target.files[0];

  if (uploadBranchLogo) {
    const reader = new FileReader();

    reader.onload = (e) => {
      setImageUrl(e.target.result);
      console.log(uploadBranchLogo);
    };

    console.log(uploadBranchLogo, "lplp");

    reader.readAsDataURL(uploadBranchLogo);
    setBranchLogo(uploadBranchLogo);
    try {
      const data = new FormData();
      data.append("image", uploadBranchLogo);
      let val = await UploadProfileImg(data);
      console.log(val);
    } catch (error) {}
  }
};

export const FileUploadForm = ({ props }) => {
  const {
    imageUrl,
    editMode,
    formData,
    inputName,
    displayName,
    setImageUrl,
    setBranchLogo,
  } = props;

  const triggerFileInput = () => {
    document.getElementById("image-upload").click();
  };

  return (
    <div className="text-center py-1">
      <input
        accept="image/*"
        id="image-upload"
        type="file"
        name={inputName}
        style={{ display: "none", backgroundColor: "white" }}
        onChange={(e) => HandleImageUpload(e, setImageUrl, setBranchLogo)}
      />
      <label htmlFor="image-upload">
        <div className="w-[80px] h-[80px] flex flex-col justify-center items-center rounded-full bg-customGray text-custom-green">
          {imageUrl ? (
            <img
              alt="uploaded"
              src={imageUrl}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <>
              {editMode ? (
                <img
                  alt=""
                  src={formData}
                  className="w-36 h-36 rounded-full object-contain"
                />
              ) : (
                <>
                  <span className="text-xl font-semibold text-white">
                    {displayName}
                  </span>
                </>
              )}
            </>
          )}
        </div>
      </label>
      <div className="text-gray-500 font-medium mt-2">
        <p onClick={triggerFileInput}>Edit Profile</p>
      </div>
    </div>
  );
};

const Settings = () => {
  const navigate = useNavigate();

  const values = {
    image: null,
    userID: "AA0011",
    uplineID: "AA0001",
    emailID: "abc@gmail.com",
    userName: "ABC",
    USDTAddress: "wertfyguhijoasdmasd",
    USDTNetwork: "Default",
  };

  const [editName, setEditName] = useState(false);
  const [editUSDTAddress, setEditUSDTAddress] = useState(false);
  const [data, setData] = useState(values);
  const [showImage, setShowImage] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [branchLogo, setBranchLogo] = useState(null);
  const [profile, setProfile] = useState(null);
  const [usdtNetwork, setUsdtNetwork] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const navigate = useNavigate();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    HandleLogOut();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (e) => {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  console.log(profile, "profile");

  const HandleLogOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refId");
    localStorage.removeItem("email");
    localStorage.removeItem("userName");
    navigate("/");
    // window.location.reload();
  };

  const getProfile = async () => {
    try {
      let datas = await getUserByAuth();
      setProfile(datas.data);
      if (datas.data.image) {
        setImageUrl(`${BaseURL}/${datas.data.image}`);
      }
    } catch (error) {}
  };

  const UsdAddressSave = async () => {
    console.log(profile.USDTAddress, "Add");
    try {
      let data = { USDTAddress: profile.USDTAddress };
      let values = await UpdateProfile(data);
      console.log(values);
    } catch (error) {}
  };
  const userNameSave = async () => {
    // console.log(profile.userName, "name");
    try {
      let data = { userName: profile.userName };
      let values = await UpdateProfile(data);
      console.log(values);
    } catch (error) {}
  };

  const UsdNetwork = async (value) => {
    console.log(profile.USDTAddress, "Add");
    try {
      let data = { USDTNetwork: value };
      let values = await UpdateProfile(data);
      console.log(values);
    } catch (error) {}
  };

  useEffect(() => {
    getProfile();
    console.log("USeEffecct");
  }, []);

  return (
    <div className=" space-y-2 text-sm overflow-y-scroll h-full pb-5">
      <div className="w-full h-16 bg-primary flex justify-end items-center px-5 ">
        <div className=" flex flex-col gap-1 items-end">
          <p className="font-semibold text-white text-xs">My Wallet</p>
          <p className=" bg-white rounded-md font-semibold w-fit md:pl-10 px-3 flex items-center  ">
            {/* <BsCurrencyDollar className=" mb-1" />{" "} */}
            {profile && profile.myWallet ? profile.myWallet.toFixed(4) : 0}
          </p>
        </div>
      </div>
      <div className="flex flex-col px-5 gap-3">
        <div className="flex justify-center items-center ">
          <FileUploadForm
            props={{
              imageUrl,
              editMode: showImage,
              formData: data.image,
              inputName: "profileImage",
              displayName: profile?.userName.split(" ")[0].charAt(0),
              setImageUrl,
              setBranchLogo,
            }}
          />
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <label htmlFor="userID" className="font-semibold text-primary">
              User ID
            </label>
            <input
              type="text"
              // readOnly
              className="px-2 py-1 w-32 rounded-lg "
              value={profile?.refId ? profile?.refId : "null"}
              id="userID"
              name="userID"
            />
          </div>
          <div className="flex flex-col gap-1 text-right">
            <label htmlFor="uplineID" className="font-semibold text-primary">
              My Upline ID
            </label>
            <input
              type="text"
              // readOnly
              className="px-2 py-1 w-32 rounded-lg text-right"
              value={profile?.uplineId ? profile?.uplineId : "null"}
              id="uplineID"
              name="uplineID"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="emailID" className="font-semibold text-primary">
            Email ID
          </label>
          <input
            type="email"
            readOnly
            className=" px-2 py-1 w-full rounded-lg"
            value={profile?.email ? profile?.email : "null"}
            id="emailID"
            name="emailID"
          />
        </div>
        <div className="flex flex-col gap-1 relative">
          <label htmlFor="name" className="font-semibold text-primary">
            Name
          </label>
          <input
            type="text"
            readOnly={!editName}
            className=" px-2 py-1 w-full rounded-lg"
            value={profile?.userName ? profile?.userName : ""}
            id="userName"
            name="userName"
            onChange={handleChange}
          />
          {editName ? (
            <IoSaveOutline
              className="absolute text-primary right-2 bottom-2 cursor-pointer"
              onClick={() => {
                setEditName(!editName), userNameSave();
              }}
            />
          ) : (
            <HiOutlinePencil
              className="absolute text-primary right-2 bottom-2 cursor-pointer"
              onClick={() => setEditName(!editName)}
            />
          )}
        </div>
        <div className="flex flex-col gap-1 relative">
          <label htmlFor="USDTAddress" className="font-semibold text-primary">
            Enter your USDT Address (TRC-20)
          </label>
          <input
            type="text"
            readOnly={!editUSDTAddress}
            className=" px-2 py-1 w-full rounded-lg"
            value={profile?.USDTAddress ? profile.USDTAddress : ""}
            id="USDTAddress"
            name="USDTAddress"
            onChange={handleChange}
            placeholder="Enter USDT Address"
          />
          {editUSDTAddress ? (
            <IoSaveOutline
              className="absolute text-primary right-2 bottom-2 cursor-pointer"
              onClick={() => {
                setEditUSDTAddress(!editUSDTAddress), UsdAddressSave();
              }}
            />
          ) : (
            <HiOutlinePencil
              className="absolute text-primary right-2 bottom-2 cursor-pointer"
              onClick={() => setEditUSDTAddress(!editUSDTAddress)}
            />
          )}
        </div>
        <div className="flex flex-col gap-2 relative">
          <label htmlFor="usdtNetwork" className="text-primary font-semibold">
            USDT Network
          </label>
          <select
            id="usdtNetwork"
            name="usdtNetwork"
            className={`px-3 py-1 rounded-md border border-gray-300 custom-select ${
              usdtNetwork === "" ? "text-gray-500" : "text-black"
            }`}
            value={usdtNetwork}
            onChange={(e) => setUsdtNetwork(e.target.value)}
          >
            <option value="TRC20">TRC20</option>
            <option value="BEP20">BEP20</option>
          </select>
        </div>
        <div>
          <button
            className="bg-primary cursor-pointer md:mx-20 mt-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={showModal}
          >
            Logout
          </button>
          <Modal
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button
                key="back"
                onClick={handleCancel}
                style={{
                  backgroundColor: "#f56565",
                  color: "white",
                  border: "none",
                }}
                className="rounded-full px-4 py-2"
              >
                Cancel
              </Button>,
              <Button
                key="submit"
                type="primary"
                style={{
                  backgroundColor: "#2b6cb0",
                  color: "white",
                  border: "none",
                }}
                className="rounded-full px-4 py-2"
                onClick={handleOk}
              >
                Confirm
              </Button>,
            ]}
            centered
            width={280}
            bodyStyle={{ textAlign: "center", display: "flex" }}
          >
            <p>Are you sure you want to logout?</p>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Settings;
