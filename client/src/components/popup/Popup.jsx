import Popup from "reactjs-popup";
import "./popup.css";

export default function PopupComp({ openBtnName, heading, content }) {
  return (
    <Popup
      trigger={
        <button className="button cursor-pointer bg-black text-white rounded-xl py-2 px-3">
          {openBtnName}
        </button>
      }
      modal
      nested
    >
      {(close) => (
        <div className="modal">
          <button className="close text-black" onClick={close}>
            &times;
          </button>
          <div className="header">{heading}</div>
          <div className="content" onClick={close}>
            {content}
          </div>
          <div className="actions">
            <button
              className="button"
              onClick={() => {
                close();
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
}
