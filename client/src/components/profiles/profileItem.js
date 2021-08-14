import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";
import "../../styles/profileItem.scss";

function ProfileItem(props) {
  const { profile } = props;
  console.log(profile);
  let avatar = `http:${profile.user.avatar}`;
  console.log(avatar);

  return (
    <div className="profile-item-container">
      <div class="card-container" style={{ backgroundColor: "#0a2463" }}>
        <span class="pro-style">PRO</span>
        <div className="image-profile">
          <img class="round" src={avatar} alt="user" />
        </div>

        <h3 className="dev-name">{profile.user.name}</h3>
        <p className="dev-details">
          {isEmpty(profile.location) ? null : <span>{profile.location}</span>}
        </p>
        <p className="dev-details">
          {profile.status}{" "}
          {isEmpty(profile.company) ? null : <span>at {profile.company}</span>}
        </p>
        <div class="buttons">
          <button class="primary">
            <Link to={`/profile/${profile.handle}`} className="link-style">
              View Profile
            </Link>
          </button>
        </div>
        <div class="skills" style={{ backgroundColor: "#001845" }}>
          <h6 className="skills-title">Skills</h6>
          <ul>
            {profile.skills.slice(0, 4).map((skill, index) => (
              <li className="skills-title" key={index}>
                <i className="fa fa-check pr-1" />
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
