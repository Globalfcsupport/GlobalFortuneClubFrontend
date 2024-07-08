import React from "react";

const CompletedWithdrawRequest = () => {
    
  const data = [
    {
      userID: "User1",
      requestedDate: "2024-07-08",
      requestedAmount: 100,
      usdtWalletID: "Wallet1",
      transactionRefNo: "Ref1",
    },
    {
      userID: "User2",
      requestedDate: "2024-07-07",
      requestedAmount: 200,
      usdtWalletID: "Wallet2",
      transactionRefNo: "Ref2",
    },
    {
      userID: "User3",
      requestedDate: "2024-07-07",
      requestedAmount: 300,
      usdtWalletID: "Wallet3",
      transactionRefNo: "Ref3",
    },
    {
      userID: "User4",
      requestedDate: "2024-07-07",
      requestedAmount: 300,
      usdtWalletID: "Wallet3",
      transactionRefNo: "Ref3",
    },
    {
      userID: "User5",
      requestedDate: "2024-07-07",
      requestedAmount: 300,
      usdtWalletID: "Wallet3",
      transactionRefNo: "Ref3",
    },
  ];

  return (
    <div className="bg-bg_primary h-full p-5">
      <div className="rounded-md overflow-hidden">
        <table className="w-full" cellPadding={10} cellSpacing={0}>
          <thead className="font-semibold bg-blue-200">
            <tr>
              <th className="">User ID</th>
              <th className="">Requested Date</th>
              <th className="">Requested Amount</th>
              <th className="">USDT Wallet ID</th>
              <th className="">Transaction Ref. No</th>
              <th className="">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((item, index) => (
              <tr key={index}>
                <td className="">{item.userID}</td>
                <td className="">{item.requestedDate}</td>
                <td className="">{item.requestedAmount}</td>
                <td className="">{item.usdtWalletID}</td>
                <td className="">{item.transactionRefNo}</td>
                <td className="">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Completed
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedWithdrawRequest;
