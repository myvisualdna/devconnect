import React from "react";
import Moment from "react-moment";
import "../../styles/profileCreds.scss";

function ProfileCreds(props) {
  //Recibimos estas props desde profile.js
  const experience = props.profile.experience;
  const education = props.profile.education;

  const expItems = experience.map((exp) => (
    <li key={exp._id} className="cred-card-style">
      <h4>{exp.company}</h4>
      <p>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
        {exp.to === null ? (
          " Now"
        ) : (
          <Moment format="YYYY/MM/DD">{exp.to}</Moment>
        )}
      </p>
      <p>
        <strong>Position:</strong> {exp.title}
      </p>
      <p>
        {exp.location === "" ? null : (
          <span>
            <strong>Location: </strong> {exp.location}
          </span>
        )}
      </p>
      <p>
        {exp.description === "" ? null : (
          <span>
            <strong>Description: </strong> {exp.description}
          </span>
        )}
      </p>
    </li>
  ));

  const eduItems = education.map((edu) => (
    <li key={edu._id} className="cred-card-style">
      <h4>{edu.school}</h4>
      <p>
        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
        {edu.to === null ? (
          " Now"
        ) : (
          <Moment format="YYYY/MM/DD">{edu.to}</Moment>
        )}
      </p>
      <p>
        <strong>Degree:</strong> {edu.degree}
      </p>
      <p>
        <strong>Field Of Study:</strong> {edu.fieldofstudy}
      </p>
      <p>
        {edu.description === "" ? null : (
          <span>
            <strong>Description: </strong> {edu.description}
          </span>
        )}
      </p>
    </li>
  ));
  return (
    <div>
      <div className="cred-title">
        <h1>Experience</h1>
        {expItems.length > 0 ? (
          <ul className="list-group">{expItems}</ul>
        ) : (
          <p className="no-education">No Experience Listed</p>
        )}
      </div>
      <div className="education-title">
        <h1>Education</h1>
        {eduItems.length > 0 ? (
          <ul className="list-group">{eduItems}</ul>
        ) : (
          <p className="no-education">No Education Listed</p>
        )}
      </div>
    </div>
  );
}

export default ProfileCreds;
