import React, { useEffect, useRef, createRef } from 'react';
import './Modal.css';

export const MyModal:React.FC<{
    handleClose: () => void;
    show: boolean;
    children:any;
    showCloseButton?: boolean;
}> = ({ handleClose, show, children,showCloseButton }) => {

    const sectionRef = useRef(null);

    const showHideClassName = show 
        ? "display-block" 
        : "display-none";
 
    useEffect(() => {
        const handleClick = (e) => {
            if(sectionRef && sectionRef.current.contains(e.target)) {
                return;
            }
            handleClose();
        }
        document.addEventListener('mousedown', handleClick, false);
        return () => {
        document.removeEventListener('mousedown', handleClick, false);
        }
    },[])

    return (
        <div className={`MyModal ${showHideClassName}`} >

            <section ref={sectionRef} className="modal-main">
                {children}
                {showCloseButton 
                    ? (
                        <button onClick={handleClose}>close</button>
                    ) : null
                }
            </section>

        </div>
    );
  };