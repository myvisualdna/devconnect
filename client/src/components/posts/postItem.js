import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link } from "react-router-dom";
import {
  deletePost,
  addLike,
  removeLike,
} from "../../redux/actions/postActions";

function PostItem(props) {
  //1. Definimos los selector que vamos a necesitar
  //Definimos el auth selector
  const authSelector = useSelector((state) => state.auth);
  //Definimos el post selector
  const postSelector = useSelector((state) => state.post);

  //2. Destructuramos lo que recibimos como props
  const { post, showActions } = props;

  /////////////////////////////////////////////////////////////////
  //SEGUNDO: DISPARO DE ACTIONS//////////////////////////////////
  //Disparando la accion de borrar post
  //1. Llamamos dispatch para disparar nuestra accion de consulta
  const dispatch = useDispatch();

  //2. Definimos la accion que queremos que dispatch dispare (traemos la action de borrar posts desde redux). Esta accion se va a disparar en el item 3
  const deletePostAction = (id) => dispatch(deletePost(id));
  const addLikeAction = (id) => dispatch(addLike(id));
  const removeLikeAction = (id) => dispatch(removeLike(id));

  //3. Una vez definida la accion que hace fetch de posts en el state de redux, la incluimos dentro de un metodo. Cuando llamamos este metodo, se disparara la accion de consulta contenida dentro.
  const deletePostMethod = (id) => {
    deletePostAction(id);
  };

  //Metodo agregar Like
  const addLikeMethod = (id) => {
    addLikeAction(id);
  };

  //Metodo remover like
  const removeLikeMethod = (id) => {
    removeLikeAction(id);
  };
  /////////////////////////////////////////////////////////////////////

  //Definimos la funcion para borrar post
  const onDeleteClick = (id) => {
    deletePostMethod(id);
  };

  const onLikeClick = (id) => {
    addLikeMethod(id);
    console.log("add like");
  };

  const onUnlikeClick = (id) => {
    removeLikeMethod(id);
  };

  //Definimos la function que hace fetch de likes
  const findUserLike = (likes) => {
      if(likes.filter(like => like.user === authSelector.user.id).length > 0) {
          return true
      } else {
          return false;
      }
  }

  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <a href="profile.html">
            <img
              className="rounded-circle d-none d-md-block"
              src={post.avatar}
              alt=""
            />
          </a>
          <br />
          <p className="text-center">{post.name}</p>
        </div>
        <div className="col-md-10">
          <p className="lead">{post.text}</p>
          {showActions ? (<span>
            <button
            onClick={onLikeClick.bind(this, post._id)}
            type="button"
            className="btn btn-light mr-1"
          >
            <i className={classnames('fas fa-thumbs-up', {
                'text-info' : findUserLike(post.likes)
            })}></i>
            <span>{post.likes.length}</span>
          </button>
          <button
            onClick={onUnlikeClick.bind(this, post._id)}
            type="button"
            className="btn btn-light mr-1"
          >
            <i className="text-secondary fas fa-thumbs-down"></i>
          </button>
          <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
            Comments
          </Link>
          {post.user === authSelector.user.id ? (
            <button
              onClick={onDeleteClick.bind(this, post._id)}
              type="button"
              className="btn btn-danger mr-1"
            >
              <i className="fas fa-times" />
            </button>
          ) : null}
          </span>) : null}
        </div>
      </div>
    </div>
  );
}

PostItem.defaultProps = {
  showActions: true
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

export default PostItem;
