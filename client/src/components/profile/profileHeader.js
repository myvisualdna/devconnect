import React from "react";
import isEmpty from "../../validation/is-empty";
import "../../styles/profileHeader.scss";

function ProfileHeader(props) {
  console.log(props);

  return (
    <div class="container">
      <div>
        <div>
          <div>
            <div class="card">
              <div class="card-body">
                <div class="d-flex flex-column align-items-center text-center">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    alt="Admin"
                    class="rounded-circle"
                    width="150"
                  />
                  <div class="mt-3">
                    <h4>{props.profile.user.name}</h4>
                    <p class="text-secondary mb-1">
                      {props.profile.status}{" "}
                      {isEmpty(props.profile.company) ? null : (
                        <span> at {props.profile.company}</span>
                      )}
                    </p>
                    <p class="text-secondary mb-1">
                      {isEmpty(props.profile.location) ? null : (
                        <p>{props.profile.location}</p>
                      )}
                    </p>
                    <button class="signup-button">Follow</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="card mt-3">
              <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  {isEmpty(
                    props.profile.website && props.profile.website
                  ) ? null : (
                    <a
                      className="text-items"
                      href={props.profile.website}
                      target="_blank"
                    >
                      <div className="profile-item-style">
                        <svg
                          className="icon-style"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          color="#000"
                          class="feather feather-globe mr-2 icon-inline"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="2" y1="12" x2="22" y2="12"></line>
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                        <h6 class="mb-1">Website</h6>
                      </div>
                      <span class="item-text-secondary">
                        {props.profile.website}
                      </span>
                    </a>
                  )}
                </li>

                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  {isEmpty(
                    props.profile.social && props.profile.social.twitter
                  ) ? null : (
                    <a
                      className="text-items"
                      href={`http://${props.profile.social.twitter}`}
                      target="_blank"
                    >
                      <div className="profile-item-style">
                        <h6 class="mb-0">
                          <i className="fab fa-twitter fa-2x" />
                          Twitter
                        </h6>
                      </div>
                      <span class="item-text-secondary">
                        {props.profile.social.twitter}
                      </span>
                    </a>
                  )}
                </li>

                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  {isEmpty(
                    props.profile.social && props.profile.social.facebook
                  ) ? null : (
                    <a
                      className="text-items"
                      href={`http://${props.profile.social.facebook}`}
                      target="_blank"
                    >
                      <div className="profile-item-style">
                        <h6 class="mb-0">
                          <i className="fab fa-facebook fa-2x" />
                          Facebook
                        </h6>
                      </div>
                      <span class="item-text-secondary">
                        {props.profile.social.facebook}
                      </span>
                    </a>
                  )}
                </li>

                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  {isEmpty(
                    props.profile.social && props.profile.social.linkedin
                  ) ? null : (
                    <a
                      className="text-items"
                      href={props.profile.social.linkedin}
                      target="_blank"
                    >
                      <div className="profile-item-style">
                        <i className="fab fa-linkedin fa-2x" />
                        <h6 class="mb-1">Linkedin</h6>
                      </div>
                      <span class="item-text-secondary">
                        {props.profile.social.linkedin}
                      </span>
                    </a>
                  )}
                </li>

                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  {isEmpty(
                    props.profile.social && props.profile.social.youtube
                  ) ? null : (
                    <a
                      className="text-items"
                      href={props.profile.social.youtube}
                      target="_blank"
                    >
                      <div className="profile-item-style">
                        <i color="#c00" className="fab fa-youtube fa-2x" />
                        <h6 class="mb-1">Youtube</h6>
                      </div>
                      <span class="item-text-secondary">
                        {props.profile.social.youtube}
                      </span>
                    </a>
                  )}
                </li>

                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  {isEmpty(
                    props.profile.social && props.profile.social.instagram
                  ) ? null : (
                    <a
                      className="text-items"
                      href={props.profile.social.instagram}
                      target="_blank"
                    >
                      <div className="profile-item-style">
                        <i color="pink" className="fab fa-instagram fa-2x" />
                        <h6 class="mb-1">Instagram</h6>
                      </div>
                      <span class="item-text-secondary">
                        {props.profile.social.instagram}
                      </span>
                    </a>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
