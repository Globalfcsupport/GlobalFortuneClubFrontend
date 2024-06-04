import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const useCustomHistory = () => {
  const [customHistory, setCustomHistory] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setCustomHistory(prevHistory => {
      if (prevHistory[prevHistory.length - 1] !== location.pathname) {
        return [...prevHistory, location.pathname];
      }
      return prevHistory;
    });
  }, [location]);

  const navigateBack = () => {
    setCustomHistory(prevHistory => {
      if (prevHistory.length <= 1) return prevHistory;

      const lastPath = prevHistory.pop();
      const newHistory = [...prevHistory];
      const uniqueHistory = [...new Set(newHistory)];
      const lastUniquePath = uniqueHistory[uniqueHistory.length - 1];
      navigate(lastUniquePath);

      return newHistory;
    });
  };

  return { navigateBack };
};

export default useCustomHistory;
