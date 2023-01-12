import Modal from "./Modal";
import ModalBody from "./ModalBody";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createActivity} from "../store/activities";

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
    e.preventDefault();
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
    console.log("PRIOR TO DELETION")
    console.log(newActivity)
    setOptionCount(optionCount -1)
    const revisedActivity = newActivity
    delete revisedActivity[`option${optionCount -1}`]
    console.log("AFTER DELETE")
    console.log(revisedActivity)
    setNewActivity(revisedActivity)

  }

  return (
    <Modal>
      <ModalHeader>
        <button onClick={ props.close } className="btn btn-primary">Close Modal</button>
        <h3>Create New Activity</h3>
      </ModalHeader>
      <ModalBody>
        <form className="activity-modal" onSubmit={handleSubmit}>
          <input className="option" placeholder="Option A" value={option1} onChange={(e)=>{setOption1(e.target.value)}}></input>
          <input className="option" placeholder="Option B" value={option2} onChange={(e)=>{setOption2(e.target.value)}}></input>
          <button>Submit</button>
        </form>
        <h1>REFACTOR BELOW</h1>
        <form className="activity-modal" onSubmit={handleSubmit}>
        <input className="prompt" placeholder="Prompt" value={prompt} onChange={(e)=>{setPrompt(e.target.value)}}></input>
        {newActivity && Object.values(newActivity).map((text, i)=>{

          return (
            <input key={`option${i}`} id={i} type="text" onChange={(e)=>{handleFormChange(e, i)}} value={text}/>
          )
        })}
        <button>Submit</button>
      </form>
      <form onSubmit={addOption}>
        <button>Add Option</button>
      </form>
      <form onSubmit={removeOption}>
        <button>Remove Option</button>
      </form>
      </ModalBody>
      <ModalFooter>

      </ModalFooter>
    </Modal>
  );
}
