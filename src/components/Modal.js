import React, { useEffect, useRef } from "react";
import "./Modal.css";
/**
 * A modal which displays content when active
 */
const Modal = ({ content, showModal, setShowModal }) => {
  /* The reference of the componenet which is on the modal body*/
  const ref = useRef();
  useEffect(() => {
    /**  Closes the modal if the user clicks off the @ref */
    const onBodyClick = (event) => {
      if (showModal) {
        if (ref.current && ref.current.contains(event.target)) {
          return;
        }
        setShowModal(false);
      }
    };
    document.body.addEventListener("click", onBodyClick);
    //Cleanup
    return () => {
      document.body.removeEventListener("click", onBodyClick);
    };
  }, [showModal, setShowModal]);

  if (showModal === false) {
    return null;
  }
  return (
    <React.Fragment>
      <div id="myModal" className="modal">
        <div ref={ref} className="modal-content sm:w-9/12 w-11/12">
          <div className="modal-header flex flex-row-reverse">
            <span
              className="close mr-4"
              onClick={() => {
                setShowModal(false);
              }}
            >
              &times;
            </span>
          </div>
          <div className="content sm:p-4 pt-0 p-4">{content}</div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Modal;
