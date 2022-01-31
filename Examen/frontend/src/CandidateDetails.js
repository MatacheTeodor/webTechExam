

function CandidateDetails(props) {

    const { item, onDeleteCandidate } = props;

    const deleteCandidate = () => {
        onDeleteCandidate(item.id, item.jobId)
    }

    const editCandidate = () => {

    }

    return (
        <div>
            <div>
                My Name is <a className="movie-title">{item.name}</a>  my cv is <span className="movie-category">{item.cv} </span> and my email is <span className="movie-category"> {item.email}</span>
            </div>
            <div>
                <input type='button' value='delete' onClick={deleteCandidate} />
                <input type='button' value='edit' onClick={editCandidate} />
            </div>
        </div>
    );
}

export default CandidateDetails;