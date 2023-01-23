import Modal from "./Modal";
import ModalBody from "./ModalBody";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createActivity} from "../store/activities";
import './ActivityModal.css'

export default function ActivityModal(props) {

  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([])
  const [prompt, setPrompt] = useState("")
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");

  const [activity, setActivity] = useState({})
  const [optionCount, setOptionCount] = useState(3)
  const [newActivity, setNewActivity] = useState(
    {"option1":"option 1","option2":"option 2"}
  );

  // session user


  const handleSubmit = (e) => {
    // e.preventDefault();
    setErrors([]);
    // need to write thunk action creator

    let optionsPayload = newActivity
    console.log("OPTIONS PAYLOAD stringified")
    optionsPayload = JSON.stringify(optionsPayload)
    console.log(optionsPayload)

    return dispatch(createActivity(
      {
        "prompt": prompt,
        "style": "multiple choice",
        "options": optionsPayload,
        "user_id": sessionUser.id
      }
    ))
  }

  const handleFormChange = (e, i) => {
    setNewActivity({...newActivity, [`option${i+1}`]: e.target.value})
   }

  const addOption = (e) => {
    e.preventDefault();
    setOptionCount(optionCount + 1)
    setNewActivity({...newActivity, [`option${optionCount}`]: `option ${optionCount}` })

  }

  const removeOption = (e) => {
    e.preventDefault();
    setOptionCount(optionCount -1)
    const revisedActivity = newActivity
    delete revisedActivity[`option${optionCount -1}`]
    setNewActivity(revisedActivity)

  }

  return (
    <Modal>
      <ModalHeader>
        <div className="activity-modal-header">
          <div>
            <h3>Create New Activity</h3>
            <br></br>
            <p>Set the prompt and write the options! You won't be able to change the number of options later, so think carefully.</p>
            <br></br>

          </div>
          <button className="within-activity-modal-button-cancel" onClick={ props.close } >CANCEL</button>
        </div>
      </ModalHeader>
      <ModalBody>
        <form className="activity-modal" >
        <input className="prompt" placeholder="Prompt" value={prompt} onChange={(e)=>{setPrompt(e.target.value)}}></input>
        {newActivity && Object.values(newActivity).map((text, i)=>{

          return (
            <input className="option" key={`option${i}`} id={i} type="text" onChange={(e)=>{handleFormChange(e, i)}} value={text}/>
          )
        })}
          <div className="button-row">
            <div>
              <button className="within-activity-modal-button" onClick={addOption}>ADD </button>
              <button className="within-activity-modal-button" onClick={removeOption}>SUBTRACT </button>
            </div>
            <div>
              <button className="within-activity-modal-button-submit" onClick={handleSubmit}>SUBMIT</button>
            </div>
          </div>
      </form>

      </ModalBody>
      <ModalFooter>

      </ModalFooter>
    </Modal>
  );
}
