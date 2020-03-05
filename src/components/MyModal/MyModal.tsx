import React, { useEffect, useRef } from 'react';
import './MyModal.css';
import ReactDOM from 'react-dom';

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <ModalContainer>
        
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
        </ModalContainer>

        );

    
}


const ModalContainer:React.FC<{
    children:any;
}> = props => {
    const el = document.createElement('div');
    const modalRoot = document.getElementById('modal-root');

    useEffect(() => {
        modalRoot.appendChild(el);
        return () => {
            modalRoot.removeChild(el);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return ReactDOM.createPortal(
        props.children,
        modalRoot,
      );
};