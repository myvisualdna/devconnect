import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { deleteComment } from "../../redux/actions/postActions";

function CommentItem() {
  //Definimos los selector que vamos a necesitar
  //Definimos el auth selector
  const authSelector = useSelector((state) => state.auth);
  //Definimos el post selector
  const postSelector = useSelector((state) => state.post);

  //Definimos la accion para hacer fetch del single post
  /////////////////////////////////////////////////////////////////
  //SEGUNDO: DISPARO DE ACTIONS//////////////////////////////////
  //Disparando la accion de eliminar comentario
  //1. Llamamos dispatch para disparar nuestra accion de consulta
  const dispatch = useDispatch();

  //2. Definimos la accion que queremos que dispatch dispare (traemos la action de hacer eliminar comentario desde redux). Esta accion se va a disparar en el item 3
  const deleteCommentAction = (postId, commentId) =>
    dispatch(deleteComment(postId, commentId));

  //3. Una vez definida la accion que elimina el comentario en el state de redux, la incluimos dentro de un metodo. Cuando llamamos este metodo, se disparara la accion de consulta contenida dentro.
  const deleteCommentMethod = (postId, commentId) => {
    deleteCommentAction(postId, commentId);
  };
  /////////////////////////////////////////////////////////////////////

  //Definimos el onDelete del comment
  const onDeleteClick = (postId, commentId) => {
    deleteCommentMethod(postId, commentId);
  };
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <a href="profile.html">
            <img
              className="rounded-circle d-none d-md-block"
              src={postSelector.post.comment.avatar}
              alt=""
            />
          </a>
          <br />
          <p className="text-center">{postSelector.post.comment.name}</p>
        </div>
        <div className="col-md-10">
          <p className="lead">{postSelector.post.comment.text}</p>
          <p>
            {postSelector.post.user === authSelector.user.id ? (
              <button
                onClick={onDeleteClick.bind(
                  this,
                  postSelector.post._id,
                  postSelector.post.comment._id
                )}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </p>
        </div>
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
};

export default CommentItem;
