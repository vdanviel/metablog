import classNames from 'classnames';
import { useState, useEffect } from "react";
import { MdDone } from "react-icons/md";

export default function AlertFadeDefault({ message, duration }) {

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
          'z-50 fixed bottom-0 left-1/2 my-2 mb-10 flex -translate-x-1/2 transform cursor-default items-center transition-opacity duration-500',
          {
            'opacity-0': !visible,
            'opacity-100': visible,
          }
        )}
      >
        <div className="inline-flex items-center justify-center bg-[#3b82f6] border border-[#4f65ff] text-white px-4 py-3 rounded relative" role="alert">
          <MdDone size={18} className='mr-2' />
          <span className="block sm:inline mr-5 ">{message}</span>
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
          >
            <span className="text-white font-bold">X</span>
          </button>
        </div>
      </div>
    );
  };