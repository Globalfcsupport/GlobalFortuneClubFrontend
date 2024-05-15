import { Switch,Button } from 'antd';
const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
//   const App = () => <Switch defaultChecked onChange={onChange} />;
const Settings = () => {
  return (
    <div className="w-full h-full">
        <h1 className="font-bold text-2xl">Settings</h1>
    <div className="border border-gray-200 ml-3 p-6 w-fit">
      <div className="grid grid-cols-2 gap-2">
      <label htmlFor="platformFee">Platform Fee:</label>
        <div className="relative">
          <input id="platformFee" type="text" className="bg-gray-200 border rounded-md pl-8"/>
          <span className="absolute right-3 text-gray-700">$</span>
        </div>
        <label htmlFor="">Withdraw Fee:</label>
        <div className="relative">
            <input type="text"  className="bg-gray-200 border w-full rounded-md pl-8"/>
            <span className="absolute right-3 text-gray-700">%</span>
        </div>
        <label htmlFor="">Internal Transaction Fee:</label>
        <div className="relative">
        <input type="text"  className="bg-gray-200 border w-full rounded-md"/>
        <span className="absolute right-3 text-gray-700">$</span>
        </div>
        <label htmlFor="">Minimum Crypto Deposit:</label>
        <div className="relative">
            <input type="text"  className="bg-gray-200 border w-full rounded-md"/>
        <span className="absolute right-3 text-gray-700">$</span>
        </div>
            <label htmlFor="">Minimum Internal Trasaction:</label>
        <div className="relative">
            <input type="text"  className="bg-gray-200 border  w-full rounded-md"/>
            <span className="absolute right-3 text-gray-700">$</span>
        </div>
        <label htmlFor="">Spacer:</label>
        <div className="relative">
            <input type="text"  className="bg-gray-200 border w-full rounded-md"/>
            <span className="absolute right-3 text-gray-700">Gap</span>
        </div>
        <label htmlFor="">Withdraw Internal:</label>
        <div className="relative">
            <input type="text"  className="bg-gray-200 border w-full rounded-md"/>
            <span className="absolute right-3 text-gray-700">Days</span>
        </div>
            <label htmlFor="">Minimum Withdraw:</label>
        <div className="relative">
            <input type="text"  className="bg-gray-200 border w-full rounded-md"/>
            <span className="absolute right-3">$</span>
        </div>
            <label htmlFor="">Allow new Sign-Up:</label>
            <Switch defaultChecked onChange={onChange} className='w-7'/>  
            <label htmlFor="">Allow new FC slot:</label>
            <Switch defaultChecked onChange={onChange} className='w-7'/>
            <label htmlFor="">Maintenance Mode:</label>
            <Switch defaultChecked onChange={onChange} className='w-7'/>
            <label htmlFor="">Referral Commission Slot:</label>
            <div className='relative'>
            <input type="text"  className="bg-gray-200 border  w-full rounded-md"/>
            <span className='absolute right-3 '>$</span>
            </div>
            <label htmlFor="">Change Password:</label>
            <Button type="primary">Tap To Change</Button>
             
      </div>
    </div>
    </div>
  )
}

export default Settings
