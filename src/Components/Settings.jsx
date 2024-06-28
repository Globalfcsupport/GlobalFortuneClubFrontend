import React, { useState } from 'react';
import { HiOutlinePencil } from "react-icons/hi2";
import { IoSaveOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

export const HandleImageUpload = (e, setImageUrl, setBranchLogo) => {
  const uploadBranchLogo = e.target.files[0];

  if (uploadBranchLogo) {
    const reader = new FileReader();

    reader.onload = (e) => {
      setImageUrl(e.target.result);
      console.log(uploadBranchLogo);
    };

    reader.readAsDataURL(uploadBranchLogo);
    setBranchLogo(uploadBranchLogo);
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
        <div className="w-[80px] h-[80px] flex flex-col justify-center items-center border-2 border-primary rounded-full bg-white text-custom-green">
          {imageUrl ? (
            <img
              alt="uploaded"
              src={imageUrl}
              className="w-36 h-36 rounded-full object-contain"
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
                  <span className="text-[15px] font-normal">
                    {displayName}
                  </span>
                </>
              )}
            </>
          )}
        </div>
      </label>
    </div>
  );
};

const Settings = () => {

  const navigate = useNavigate()

  const values = {
    image: null,
    userID: 'AA0011',
    uplineID: 'AA0001',
    emailID: 'abc@gmail.com',
    name: 'ABC',
    USDTAddress: 'wertfyguhijoasdmasd',
    USDTNetwork: 'Default'
  };

  const [editName, setEditName] = useState(false);
  const [editUSDTAddress, setEditUSDTAddress] = useState(false);
  const [data, setData] = useState(values);
  const [showImage, setShowImage] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [branchLogo, setBranchLogo] = useState(null);

  const handleChange = (e) => {
    setData(prev => ({
      ...prev, [e.target.name]: e.target.value
    }));
  };

  const HandleLogOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refId");
    localStorage.removeItem("email");
    localStorage.removeItem("userName");
    navigate('/');
    // window.location.reload();
  }

  return (
    <div className='font-poppins space-y-2 text-sm'>
      <div className='w-full h-12 bg-primary flex justify-between items-center px-5 '>
        <p className='font-semibold text-white'>My Wallet</p>
        <p className='px-3 bg-white rounded-md font-semibold py-[0.125rem] font-pri'>1000.0000</p>
      </div>
      <div className='flex flex-col px-5  gap-3'>
        <div className='flex justify-center items-center '>
        <FileUploadForm
          props={{
            imageUrl,
            editMode: showImage,
            formData: data.image,
            inputName: 'profileImage',
            displayName: 'Upload Image',
            setImageUrl,
            setBranchLogo,
          }}
        />
        </div>

        <div className='flex justify-between'>
          <div className='flex flex-col gap-1'>
            <label htmlFor='userID' className='font-semibold text-primary'>User ID</label>
            <input type='text' readOnly className='px-2 py-1 w-32 rounded-lg' value={data.userID} id='userID' name='userID' />
          </div>
          <div className='flex flex-col gap-1 text-right'>
            <label htmlFor='uplineID' className='font-semibold text-primary'>Upline ID</label>
            <input type='text' readOnly className='px-2 py-1 w-32 rounded-lg text-right' value={data.uplineID} id='uplineID' name='uplineID' />
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='emailID' className='font-semibold text-primary'>Email ID</label>
          <input type='email' readOnly className=' px-2 py-1 w-full rounded-lg' value={data.emailID} id='emailID' name='emailID' />
        </div>
        <div className='flex flex-col gap-1 relative'>
          <label htmlFor='name' className='font-semibold text-primary'>Name</label>
          <input type='text' readOnly={!editName} className=' px-2 py-1 w-full rounded-lg' value={data.name} id='name' name='name' onChange={handleChange} />
          {editName ? 
            <IoSaveOutline className='absolute text-primary right-2 bottom-2 cursor-pointer' onClick={() => setEditName(!editName)} /> :
            <HiOutlinePencil className='absolute text-primary right-2 bottom-2 cursor-pointer' onClick={() => setEditName(!editName)} />
          }
        </div>
        <div className='flex flex-col gap-1 relative'>
          <label htmlFor='USDTAddress' className='font-semibold text-primary'>USDT Address</label>
          <input type='text' readOnly={!editUSDTAddress} className=' px-2 py-1 w-full rounded-lg' value={data.USDTAddress} id='USDTAddress' name='USDTAddress' onChange={handleChange} />
          {editUSDTAddress ? 
            <IoSaveOutline className='absolute text-primary right-2 bottom-2 cursor-pointer' onClick={() => setEditUSDTAddress(!editUSDTAddress)} /> :
            <HiOutlinePencil className='absolute text-primary right-2 bottom-2 cursor-pointer' onClick={() => setEditUSDTAddress(!editUSDTAddress)} />
          }
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='USDTNetwork' className='font-semibold text-primary'>USDT Network</label>
          <select className=' px-2 py-1 w-full rounded-lg' value={data.USDTNetwork} id='USDTNetwork' name='USDTNetwork' onChange={handleChange}>
            <option value=''>Select Your Network</option>
            <option value='A'>A</option>
            <option value='B'>B</option>
            <option value='C'>C</option>
          </select>
        </div>
        <button 
        className='bg-blue-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        onClick={HandleLogOut}
        >Logout</button>
      </div>
    </div>
  );
};

export default Settings;

