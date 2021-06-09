import React, { Component } from 'react'
import { BiLoader } from 'react-icons/bi'
import { FaVuejs, FaNodeJs, FaAngular, FaReact } from 'react-icons/fa';
import { SiNextDotJs } from 'react-icons/si';
import Header from '../Header/Header';
import {Link} from 'react-router-dom';
import './CourseList.css'

class CourseList extends Component {
  constructor() {
    super();
    this.state = {
      isCourseListLoaded: false,
      courses: [],
      error: null
    }
  }

 renderCourseIcon(course){
    if (course) { 
        let icon =null;
        switch (course.icon) {
          case "FaReact":   icon = <FaReact/>; break;
          case "FaAngular": icon = <FaAngular/>;break;
          case "FaNodeJs":  icon = <FaNodeJs/>;break;
          case "FaVuejs":   icon = <FaVuejs/>;break;
          case "SiNextDotJs": icon = <SiNextDotJs/>;break;
        }
        return icon;
    }
 }

 render() {
    const {error, isCourseListLoaded, courses} = this.state;
    if (error) {
         return <div>Error: {error.message}</div>
    } else if (!isCourseListLoaded) {
         return <div className="loaderStyle">
                <p><BiLoader/></p>
                 <p>Loading ...</p>
              </div>
    } else {
      if (courses && courses.length > 0) { 
        const CourseList = courses.map((course, index) => {
          const bgColor = `hsl(${(index + 6) * 100},93%,53%)`;
          const processBgColor = bgColor.trim().replaceAll('%','-');
          return ( <ul className="courseListStyle" key={index}
                       style={{backgroundColor: bgColor}}
                       >
                      <li className="itemStyle"><h2>{course.name}</h2>{this.renderCourseIcon(course)}</li>
                      <li>{course.description}</li>    
                      <li>Course Starting Date: {course.dateOfStart}</li> 
                      {/* <li className="itemStyle"><span>Total Seats Available: {course.totalSeats} </span><button  className="btn first"><Link to={`/register/${course.name}/${course.courseId}/${bgColor.trim().replaceAll('%','-')}`} */}
                      <li className="itemStyle"><span>Total Seats Available: {course.totalSeats} </span><button  className="btn first"><Link to=
                      {{
                        pathname: '/register',
                        state: { params: {name: course.name, id: course.courseId,formColor:processBgColor} }
                      }}>Enroll</Link></button></li>  
                  </ul>)
        })
        return (
          <div>
               <Header />
               <div className="courseSectionStyle">{CourseList}</div>
          </div>
        )
      }
    }
  }

  componentDidMount() {
    const url = "http://localhost:6700/courses";
    fetch(url, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          courses: data,
          isCourseListLoaded: true
        })
      }, (error) => {
        this.setState({
          isCourseListLoaded: false,
          error
        })
      })
  }
}

export default CourseList;