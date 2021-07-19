import React from "react";
import isEmpty from "../../validation/is-empty";

function ProfileHeader(props) {
  console.log(props);

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-info text-white mb-3">
          <div className="row">
            <div className="col-4 col-md-3 m-auto">
              <img
                className="rounded-circle"
                src={props.profile.user.avatar}
                alt=""
              />
            </div>
          </div>
          <div className="text-center">
            <h1 className="display-4 text-center">{props.profile.user.name}</h1>
            <p className="lead text-center">
              {props.profile.status}{" "}
              {isEmpty(props.profile.company) ? null : (
                <span> at {props.profile.company}</span>
              )}
            </p>
            <p>
              {isEmpty(props.profile.location) ? null : (
                <p>{props.profile.location}</p>
              )}
            </p>
            <p>
              {isEmpty(
                props.profile.website && props.profile.website
              ) ? null : (
                <a
                  className="text-white p-2"
                  href={props.profile.website}
                  target="_blank"
                >
                  <i className="fas fa-globe fa-2x" />
                </a>
              )}
              {isEmpty(
                props.profile.social && props.profile.social.twitter
              ) ? null : (
                <a
                  className="text-white p-2"
                  href={`http://${props.profile.social.twitter}`}
                  target="_blank"
                >
                  <i className="fab fa-twitter fa-2x" />
                </a>
              )}
              {isEmpty(
                props.profile.social && props.profile.social.facebook
              ) ? null : (
                <a
                  className="text-white p-2"
                  href={`http://${props.profile.social.facebook}`}
                  target="_blank"
                >
                  <i className="fab fa-facebook fa-2x" />
                </a>
              )}

              {isEmpty(
                props.profile.social && props.profile.social.linkedin
              ) ? null : (
                <a
                  className="text-white p-2"
                  href={`http://${props.profile.social.linkedin}`}
                  target="_blank"
                >
                  <i className="fab fa-linkedin fa-2x" />
                </a>
              )}

              {isEmpty(
                props.profile.social && props.profile.social.youtube
              ) ? null : (
                <a
                  className="text-white p-2"
                  href={`http://${props.profile.social.youtube}`}
                  target="_blank"
                >
                  <i className="fab fa-youtube fa-2x" />
                </a>
              )}

{isEmpty(
                props.profile.social && props.profile.social.instagram
              ) ? null : (
                <a
                  className="text-white p-2"
                  href={`http://${props.profile.social.instagram}`}
                  target="_blank"
                >
                  <i className="fab fa-instagram fa-2x" />
                </a>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
