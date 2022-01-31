import { EventEmitter } from 'fbemitter';

//const SERVER = 'http://localhost:3001';
//Heroku
const SERVER = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`

class JobStore {
    constructor () {
        this.data = []
        this.candidateData = []
        this.emitter = new EventEmitter()
    }

    async getJobs() {
        try{
            const response = await fetch(`${SERVER}/jobs`)
            if(!response.ok){
                throw response
            }
            this.data=await response.json()
            this.emitter.emit('GET_JOBS_SUCCESS')
        } catch(err) {
            console.warn(err)
            this.emitter.emit('GET_JOBS_ERROR')
        }
    }

    async getSortedJobs() {
        try{
            const response = await fetch(`${SERVER}/jobsSorted`)
            if(!response.ok){
                throw response
            }
            this.data=await response.json()
            this.emitter.emit('GET_JOBS_SORTED_SUCCESS')
        } catch(err) {
            console.warn(err)
            this.emitter.emit('GET_JOBS_SORTED_ERROR')
        }
    }

    async addJob(job) {
        try{
            const response = await fetch(`${SERVER}/jobs`,{
                method:'POST',headers: {'Content-Type' : 'application/json'}, body: JSON.stringify(job)
            })
            if(!response.ok){
                throw response
            }
            this.getJobs()
        } catch(err) {
            console.warn(err)
            this.emitter.emit('ADD_JOB_ERROR')
        }
    }
    
    async saveJob(id,job) {
        try{
            const response = await fetch(`${SERVER}/jobs/${id}`,{
                method:'PUT',headers: {'Content-Type' : 'application/json'}, body: JSON.stringify(job)
            })
            if(!response.ok){
                throw response
            }
            this.getJobs()
        } catch(err) {
            console.warn(err)
            this.emitter.emit('SAVE_JOB_ERROR')
        }
    }

    async deleteJob(id) {
        try{
            const response = await fetch(`${SERVER}/jobs/${id}`,{
                method:'DELETE'
            })
            if(!response.ok){
                throw response
            }
            this.getJobs()
        } catch(err) {
            console.warn(err)
            this.emitter.emit('DELETE_JOB_ERROR')
        }
    }

    async filterJob(description, deadline) {
        try{
            const response = await fetch(`${SERVER}/jobsFilter/${description}/${deadline}`)
            if(!response.ok){
                throw response
            }
            this.data=await response.json()
            this.emitter.emit('GET_JOB_FILTER_SUCCESS')
        } catch(err) {
            console.warn(err)
            this.emitter.emit('GET_JOB_FILTER_ERROR')
        }
    }

    async getCandidates(jobId) {
        try{
            const response = await fetch(`${SERVER}/jobs/${jobId}/candidate`)
            if(!response.ok){
                throw response
            }
            this.candidateData=await response.json()
            this.emitter.emit('GET_CANDIDATE_SUCCESS')
        } catch(err) {
            console.warn(err)
            this.emitter.emit('GET_CANDIDATE_ERROR')
        }
    }

    async deleteCandidate(id, jobId) {
        try{
            const response = await fetch(`${SERVER}/candidate/${id}`,{
                method:'DELETE'
            })
            if(!response.ok){
                throw response
            }
            this.getCandidates(jobId);
        } catch(err) {
            console.warn(err)
            this.emitter.emit('DELETE_JOB_ERROR')
        }
    }

    async addCandidate(name, cv, email, jobId) {
        try{
            var candidate = { name, cv, email, jobId }
            const response = await fetch(`${SERVER}/jobs/${jobId}/candidate`,{
                method:'POST',headers: {'Content-Type' : 'application/json'}, body: JSON.stringify(candidate)
            })
            if(!response.ok){
                throw response
            }
            this.getCandidates(jobId);
        } catch(err) {
            console.warn(err)
            this.emitter.emit('ADD_JOB_ERROR')
        }
    }
}


const store = new JobStore();

export default store;