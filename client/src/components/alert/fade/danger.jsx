import classNames from 'classnames';
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

export default function AlertFadeDanger({ message, duration }) {

    const [visible, setVisible] = useState(true);
  
    useEffect(() => {

      const timer = setTimeout(() => setVisible(false), duration);
      return () => clearTimeout(timer);

    }, [duration]);
  
    const handleClose = () => {
      setVisible(false);
    };
  
    return (
      <div
        className={classNames(
          'fixed bottom-0 left-1/2 my-2 mb-10 flex -translate-x-1/2 transform cursor-default items-center transition-opacity duration-500',
          {
            'opacity-0': !visible,
            'opacity-100': visible,
          }
        )}
      >
        <div className="inline-flex items-center justify-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <IoClose size={18} className='mr-2' />
          <span className="block sm:inline mr-5 ">{message}</span>
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
          >
            <span className="text-red-700 font-bold">X</span>
          </button>
        </div>
      </div>
    );
  };