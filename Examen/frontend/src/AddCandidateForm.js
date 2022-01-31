import { useState } from "react";

function AddCandidateForm(props) {
    const { onAdd, jobId } = props 
    const [name, setName] = useState('');
    const [cv, setCV] = useState('');
    const [email, setEmail] = useState('');

    const add = (event) => {
        onAdd(
            name, 
            cv,
            email,
            jobId
        )
        setName('');
        setCV('');
        setEmail('');
    }

    return (
        <div>
            <div>
                <input type='text' placeholder='name' value={name} onChange={(evt) => setName(evt.target.value)} />
                <input type='text' placeholder='cv' value={cv} onChange={(evt) => setCV(evt.target.value)} />
                <input type='text' placeholder='email' value={email} onChange={(evt) => setEmail(evt.target.value)} />
                
                <div>
                    <input type='button' value='Add candidate' onClick={add}/>
                </div>
            </div>
        </div>
    );
}

export default AddCandidateForm;
