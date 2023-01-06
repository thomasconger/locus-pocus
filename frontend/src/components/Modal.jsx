export default function Modal(props) {
  return (
    <div className="modal d-block">
      <div className="modal-dialog">
        <div className="modal-content">
          { props.children }
        </div>
      </div>
    </div>
  );
}

// import { useEffect } from "react";
// import ReactDOM from "react-dom";
// import "./Modal.css";
// import { CSSTransition } from "react-transition-group";


// const Modal = (props) => {

//   const closeOnEscapeKeyDown = e => {
//     if ((e.charCode || e.keyCode) === 27) {
//       props.onClose();
//     }
//   };

//   useEffect(() => {
//     document.body.addEventListener("keydown", closeOnEscapeKeyDown);
//     return function cleanup() {
//       document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
//     };
//   }, []);

//   return ReactDOM.createPortal(
//     <CSSTransition
//     in={props.show}
//     unmountOnExit
//     timeout={{ enter: 0, exit: 300 }}
//     >
//       <div className="modal" onClick={props.onClose}>
//           <div className="modal-content" onClick={e => e.stopPropagation()}>
//             <div className="modal-header">
//               <h4 className="modal-title">{props.title}</h4>
//             </div>
//             <div className="modal-body">{props.children}</div>
//             <div className="modal-footer">
//               <button onClick={props.onClose} className="button">
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       </CSSTransition>
//       ,
//     document.getElementById("portal")
//   )
// }

// export default Modal
