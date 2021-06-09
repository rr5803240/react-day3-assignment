import React, {Component} from 'react';
import { BiLoader } from 'react-icons/bi';
import Header from '../Header/Header';
import './Trainees.css';

class Trainees extends Component{
    constructor(){
        super()
        this.state= {
            traineesList:[],
            isTraineesListLoaded:false,
            error:null
        }
    }

    render(){
        const {error, isTraineesListLoaded} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>
       } else if (!isTraineesListLoaded) {
            return <div className="loaderStyle">
                   <p><BiLoader/></p>
                    <p>Loading ...</p>
                 </div>
       } else {
        return (
            <ul className="trainee-list">
                <Header title="Trainees Who have registered the Course" />
                {
                    this.state.traineesList.map( (record,index)=>{
                    return  <li key={index}>
                                <p><b>Name :</b>{record.firstName}{record.lastName}</p>
                                <p><b>Email :</b>{record.emailId}</p>
                                <p><b>Contact :</b>{record.contact}</p>
                                <p><b>Course Name:</b>{record.courseName}</p>
                                <p><b> Registered Date </b> :{record.enrolledDate}</p>
                            </li>
                    })
                }
            </ul>
            )
        }
    }

    componentDidMount(){
        const traineesListUrl = 'http://localhost:6700/trainees'
        fetch(traineesListUrl,{method:'GET'})
        .then((response)=> response.json())
        .then((records)=>{
            this.setState({
                traineesList :records,
                isTraineesListLoaded: true
            })
        },(error)=>{
            this.setState({
                isTraineesListLoaded :false,
                error
            })
        })
    }
}

export default Trainees;