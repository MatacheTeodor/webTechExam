import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddJobForm(props) {
    const { onAdd } = props 
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState(new Date());

    const add = (event) => {
        onAdd({
            description, 
            deadline
        })
        setDescription('');
    }

    return (
        <div>
            <div>
                <input type='text' placeholder='description' value={description} onChange={(evt) => setDescription(evt.target.value)} />
                <div>
                    <label for="deadline">Deadline:</label>

                    <DatePicker selected={deadline} onChange={date => setDeadline(date)} />
                </div>
                <div>
                    <input type='button' value='add me!' onClick={add}/>
                </div>
            </div>
        </div>
    );
}

export default AddJobForm;
