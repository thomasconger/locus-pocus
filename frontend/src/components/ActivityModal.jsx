import Modal from "./Modal";
import ModalBody from "./ModalBody";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createActivity} from "../store/activities";
import './ActivityModal.css'
import { IoClose, IoAdd, IoRemove } from "react-icons/io5";

export default function ActivityModal(props) {

  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([])
  const [success, setSuccess] = useState([])
  const [prompt, setPrompt] = useState("")
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");

  const [activity, setActivity] = useState({})
  const [optionCount, setOptionCount] = useState(3)
  const [newActivity, setNewActivity] = useState(
    {"option1":"","option2":""}
  );

  // session user


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    // need to write thunk action creator

    let optionsPayload = newActivity

    const optionsPayloadHasEmpty = Object.values(newActivity).some((item)=> item == '')
    if (optionsPayloadHasEmpty) {
      setSuccess([])
      return setErrors(['Each option must have a value'])
    }

    if (prompt == '') {
      setSuccess([])
      return setErrors(['You must specify a prompt.'])
    }

    optionsPayload = JSON.stringify(optionsPayload)


    return dispatch(createActivity(
      {
        "prompt": prompt,
        "style": "multiple choice",
        "options": optionsPayload,
        "user_id": sessionUser.id
      }
    )).catch(async (res) => {
      let data;
      try {
        // .clone() essentially allows you to read the response body twice
        data = await res.clone().json();
      } catch {
        data = await res.text(); // Will hit this case if the server is down
      }
      if (data?.errors) setErrors(data.errors);
      else if (data) setErrors([data]);
      else setErrors([res.statusText]);
    }).then(
      setSuccess(["Success!"])
      ).then(
        props.close(e)
      );
  }

  const handleFormChange = (e, i) => {
    setNewActivity({...newActivity, [`option${i+1}`]: e.target.value})
   }

  const addOption = (e) => {
    e.preventDefault();
    setOptionCount(optionCount + 1)
    setNewActivity({...newActivity, [`option${optionCount}`]: `` })

  }

  const removeOption = (e) => {
    e.preventDefault();
    setOptionCount(optionCount - 1)
    const revisedActivity = newActivity
    delete revisedActivity[`option${optionCount -1}`]
    setNewActivity(revisedActivity)

  }



  // controls whether option button displays
  let enoughOptions;
  let displayAdd = true;


    if (optionCount > 2) {
      enoughOptions = true;
    }
    if (optionCount > 8){
      enoughOptions = true;
      displayAdd = false;
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
          <button className="passive close" onClick={ props.close } ><IoClose/></button>
        </div>
      </ModalHeader>
      <ModalBody>
        <form className="activity-modal" >
        <input className="prompt" placeholder="Prompt" value={prompt} onChange={(e)=>{setPrompt(e.target.value)}}></input>
        {newActivity && Object.values(newActivity).map((text, i)=>{

          return (
            <input className="option" key={`option${i}`} id={i} type="text" onChange={(e)=>{handleFormChange(e, i)}} value={text} placeholder='Option'/>
          )
        })}
          <div className="button-row">
            <div>
              { displayAdd && ( <button
                className="passive"
                onClick={addOption}>
                  <IoAdd /> Add option
              </button>)
              }

              { enoughOptions && (<button
                className="passive"
                onClick={removeOption}>
                  <IoRemove /> Remove option
              </button>)
              }

            </div>
            <div>
              <button className="cta" onClick={handleSubmit}>Create new activity</button>
            </div>
          </div>
      </form>

      </ModalBody>
      <ModalFooter>
        <ul className="user-messages">
            {success?.map(success => <li className="success" key={success}>{success}</li>)}
            {errors?.map(error => <li className="login-error-item" key={error}>{error}</li>)}
        </ul>

      </ModalFooter>
    </Modal>
  );
}
