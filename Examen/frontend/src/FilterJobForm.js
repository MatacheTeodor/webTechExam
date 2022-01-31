import { useState } from "react";

 function FilterJobForm(props) {

    const { onFilter, setFiltered, setSorted } = props 
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');

    const filter = (event) => {
        onFilter(
            description,
            deadline
        )
    }

    const clearFilter = (event) => {
        setSorted(false);
        setFiltered(false);
    }

    const sortTitles = (event) => {
        setFiltered(false);
        setSorted(true);
    }

    return (
        <div>
            <div>
                <div>
                    <h3>Filter Jobs</h3>
                    <label for="movie-select">Choose a description:</label>
                    <input type='text' placeholder='description' value={description} onChange={(evt) => setDescription(evt.target.value)} />
                </div>
                <div>
                    <label for="release">Choose deadline:</label>

                    <input type='number' placeholder='year' value={deadline} onChange={(evt) => setDeadline(evt.target.value)} />
                </div>
                <div>
                    <input type='button' value='Filter' onClick={filter}/>
                    <input type='button' value='Clear Filter' onClick={clearFilter} />
                    <input type='button' value='Sort Alphabetically' onClick={sortTitles} />
                </div>
            </div>
        </div>
    )

 }

 export default FilterJobForm;