import React, { useState, useEffect, use } from "react";

export default function Practice() {

  const [ noOfItems, setNoOfItems ] = useState(0);
  const [ screenWidth, setScreenWidth ] = useState(window.innerWidth);
  const [ show, setShow ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(0);
  const [ data, setData ] = (useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]));

  const handlePrev = ()=> {
    setCurrentPage(prev=> prev-1);
  }
  
  const handleNext = ()=> {
    setCurrentPage(prev=> prev+1);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return ()=>window.removeEventListener('resize', handleResize)
  }, []);

  useEffect(()=> {
    console.log('size changed');
    if(screenWidth > 1536){
      setNoOfItems(4);
    }
    else if(screenWidth > 1024){
      setNoOfItems(3);  
    }
    else if(screenWidth > 640){
      setNoOfItems(2);
    }
    else{
      setNoOfItems(1);
    }

    setShow(data.slice(0, noOfItems * 2));
    
  }, [window.innerWidth, data, currentPage])

  useEffect(()=> {
    const startValue = currentPage*noOfItems*2;
    const endValue = (currentPage+1)*(noOfItems*2);
    console.log(startValue,endValue);
    
    setShow(data.slice(startValue, endValue));

    console.log(show);
    console.log(data.length);
    console.log(currentPage); 
    
    const isLastPage = (currentPage + 1) * (noOfItems * 2) >= (data?.blog?.length || 0);
    console.log(isLastPage);
    
  }, [currentPage])

  const handleResize = ()=> {
    setScreenWidth(window.innerWidth)
  }

  const totalPages = Math.ceil(data.length / (noOfItems * 2));
  console.log(totalPages);
  const isLastPage = currentPage >= totalPages - 1;

  return (
   <div>
        <div className="flex justify-between">
            {show.map((item,index)=> (
                <div key={index}>
                    {item}
                </div>
            ))}
        </div>
        <div className="flex justify-between">
            {currentPage!==0 && <button className="px-5 py-2 bg-blue-700 rounded-lg text-white" onClick={handlePrev}>Prev</button>}
            {!isLastPage && <button className="px-5 py-2 bg-blue-700 rounded-lg text-white" onClick={handleNext}>Next</button>}
        </div>
   </div>
  );
}