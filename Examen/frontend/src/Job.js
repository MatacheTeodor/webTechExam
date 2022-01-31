import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Job(props) {

    const { item, onSave, onDelete, setSelectedJob } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState(item.description);
    const [deadline, setDeadline] = useState(new Date(item.deadline));

    const seeCandidates = (event) => {
        setSelectedJob(item);
    }

    const formatReleaseDate = (d) => {
        return d.substring(0, 10);
    }

    const deleteJob = (event) => {
        onDelete(item.id);
    }

    const edit = () => {
        setIsEditing(true);
    }

    const cancel = () => {
        setIsEditing(false);
    }

    const saveJob = () => {
        onSave( item.id, {
            description,
            deadline
        })
        setIsEditing(false);
    }
    return (
        <div>
            {
                isEditing ? (
                    <>
                        editing...
                        <div>
                            <input type='text' placeholder='title' value={description} onChange={(evt) => setDescription(evt.target.value)} />
                            <div>
                                

                                <DatePicker selected={deadline} onChange={date => setDeadline(date)} />
                            </div>
                        </div>
                        <input type='button' value='cancel' onClick={cancel} />
                        <input type='button' value='save' onClick={saveJob} />
                    </>
                ) :
                    (
                        <>
                            <div>
                                The job is: <a className="job-description">{item.description}</a>  and candidates can apply until: {formatReleaseDate(item.deadline)}
                            </div>
                            <div>
                                <input type='button' value='delete' onClick={deleteJob} />
                                <input type='button' value='edit' onClick={edit} />
                                <input type='button' value='seeCandidates' onClick={seeCandidates} />
                            </div>
                        </>
                    )
            }
        </div>
    )
}

export default Job