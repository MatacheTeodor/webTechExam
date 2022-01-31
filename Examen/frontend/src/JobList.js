import { useEffect, useState } from "react";
import store from "./JobStore";
import AddJobForm from "./AddJobForm"
import Job from "./Job";
import FilterJobForm from "./FilterJobForm";
import CandidateDetails from "./CandidateDetails";
import AddCandidateForm from "./AddCandidateForm";

function JobList() {

    const [jobs, setJobs] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [areFiltered, setFiltered] = useState(false);
    const [areSorted, setSorted] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        if(selectedJob){
            store.getCandidates(selectedJob.id);
            store.emitter.addListener('GET_CANDIDATE_SUCCESS', () => {
                setCandidates(store.candidateData);
            })
        }
        if (areFiltered) {
            store.emitter.addListener('GET_JOBS_FILTER_SUCCESS', () => {
                setJobs(store.data);
            })
        }
        else if (areSorted) {
            store.getSortedJobs();
            store.emitter.addListener('GET_JOBS_SORTED_SUCCESS', () => {
                setJobs(store.data);
            })
        }
        else {
            store.getJobs();
            store.emitter.addListener('GET_JOBS_SUCCESS', () => {
                setJobs(store.data);
            })
        }

    }, [areFiltered, areSorted, selectedJob])

    const addJob = (job) => {
        store.addJob(job);
    }

    const addCandidate = (name, cv, email, jobId) => {
        store.addCandidate(name, cv, email, jobId);
    }

    const saveJob = (id, job) => {
        store.saveJob(id, job);
    }

    const deleteJob = (id) => {
        store.deleteJob(id);
    }

    const filterJob = (description, deadline) => {
        store.filterJob(description, deadline)
        setFiltered(true);
    }

    const onDeleteCandidate = (id, jobId) => {
        store.deleteCandidate(id, jobId);
    }

    return (
        <div className="flex-container">
            <div>
                <h3>Add a Job</h3>
                <AddJobForm onAdd={addJob} />
                <FilterJobForm onFilter={filterJob} setFiltered={setFiltered} setSorted={setSorted} />
            </div>
            <div>
                <h2>Candidates:</h2>
                {selectedJob ?
                    candidates.map((e) => <CandidateDetails key={e.id} item={e} onDeleteCandidate={onDeleteCandidate}/>) : <div></div>
                }
                {selectedJob ? 
                <div><AddCandidateForm onAdd={addCandidate} jobId={selectedJob.id} /></div> : <div></div>
                }
            </div>
            <div>
                <h3>list of jobs</h3>
                {
                    jobs.map((e) => <Job key={e.id} item={e} onSave={saveJob} onDelete={deleteJob} setSelectedJob={setSelectedJob} />)
                }
            </div>
            
        </div>
    );
}


//selected
export default JobList;