import Modal from "./Modal";
import ModalBody from "./ModalBody";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createActivity} from "../store/activities";



export default function ActivityModal(props) {

  const dispatch = useDispatch();
  const [errors, setErrors] = useState([])
  const [prompt, setPrompt] = useState("")
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");



  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    console.log("in handle submit")
    // need to write thunk action creator

    let optionsPayload = {
      "option1": option1,
      "option2": option2
    }
    optionsPayload = JSON.stringify(optionsPayload)

    return dispatch(createActivity(
      {
        "prompt": prompt,
        "style": "multiple choice",
        "options": optionsPayload,
        "presenter_id": "1"
      }
    ))
  }

  return (
    <Modal>
      <ModalHeader>
        <button onClick={ props.close } className="btn btn-primary">Close Modal</button>
        <h3>Create New Activity</h3>
      </ModalHeader>
      <ModalBody>
        <form className="activity-modal" onSubmit={handleSubmit}>
          <input className="prompt" placeholder="Prompt" value={prompt} onChange={(e)=>{setPrompt(e.target.value)}}></input>
          <input className="option" placeholder="Option A" value={option1} onChange={(e)=>{setOption1(e.target.value)}}></input>
          <input className="option" placeholder="Option B" value={option2} onChange={(e)=>{setOption2(e.target.value)}}></input>
          <button>Submit</button>
        </form>
      </ModalBody>
      <ModalFooter>

      </ModalFooter>
    </Modal>
  );
}
