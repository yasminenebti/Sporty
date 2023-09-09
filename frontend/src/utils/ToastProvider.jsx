import  { createContext, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';


const ToastContext = createContext();

export function ToastProvider({ children }) {
  const showToast = (message, options) => {
    toast(message, options);
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <ToastContainer position="top-right" autoClose={5000} />
    </ToastContext.Provider>
  );
}

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired, 
};


export function useToast() {
  return useContext(ToastContext);
}


