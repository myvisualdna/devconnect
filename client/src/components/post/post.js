import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProptTypes from "prop-types";
import Spinner from "../common/spinner";
import { getPost } from "../../redux/actions/postActions";
import PostItem from "../posts/postItem";
import CommentForm from "./commentForm";
import CommentFeed from "./commentFeed";

function Post(props) {
  //Definimos los selector que vamos a necesitar
  //Definimos el post selector
  const postSelector = useSelector((state) => state.post);

  //Definimos la accion para hacer fetch del single post
  /////////////////////////////////////////////////////////////////
  //SEGUNDO: DISPARO DE ACTIONS//////////////////////////////////
  //Disparando la accion de postear comentario
  //1. Llamamos dispatch para disparar nuestra accion de consulta
  const dispatch = useDispatch();

  //2. Definimos la accion que queremos que dispatch dispare (traemos la action de hacer fetch del single desde redux). Esta accion se va a disparar en el item 3
  const GetSinglePostAction = (id) => dispatch(getPost(id));

  //3. Una vez definida la accion que hace fetch de single post en el state de redux, la incluimos dentro de un metodo. Cuando llamamos este metodo, se disparara la accion de consulta contenida dentro.
  const GetSinglePostMethod = (id) => {
    GetSinglePostAction(id);
  };
  /////////////////////////////////////////////////////////////////////

  //Disparamos la accion que hace fetch del single post al montarse el componente
  useEffect(async () => {
    GetSinglePostMethod(props.match.params.id);
  }, []);

  let postContent;
  if (postSelector.post === null) {
    postContent = <Spinner />;
  } else {
    postContent = (
      <div>
        <PostItem post={postSelector.post} showActions={false} />
        <CommentFeed
          postId={postSelector.post._id}
          comments={postSelector.post.comments}
        />
        <CommentForm postId={postSelector.post._id} />
      </div>
    );
  }

  return (
    <div className="post" style={{ marginTop: "32px" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Link to="/feed" className="btn btn-light mb-3">
              Back to Feed
            </Link>
            {postContent}
          </div>
        </div>
      </div>
    </div>
  );
}

Post.ProptTypes = {
  getPost: ProptTypes.func.isRequired,
  post: ProptTypes.object.isRequired,
};

export default Post;
