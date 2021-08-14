import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProptTypes from "prop-types";
import PostForm from "./postForm";
import Spinner from "../common/spinner";
import { getPosts } from "../../redux/actions/postActions";
import PostFeed from "./postFeed";

function Posts() {
  //Definimos los selector que vamos a necesitar
  //Definimos el post selector
  const postSelector = useSelector((state) => state.post);

  //Definimos la accion para hacer fetch de posts
  /////////////////////////////////////////////////////////////////
  //SEGUNDO: DISPARO DE ACTIONS//////////////////////////////////
  //Disparando la accion de postear comentario
  //1. Llamamos dispatch para disparar nuestra accion de consulta
  const dispatch = useDispatch();

  //2. Definimos la accion que queremos que dispatch dispare (traemos la action de hacer fetch de posts desde redux). Esta accion se va a disparar en el item 3
  const GetPostsAction = () => dispatch(getPosts());

  //3. Una vez definida la accion que hace fetch de posts en el state de redux, la incluimos dentro de un metodo. Cuando llamamos este metodo, se disparara la accion de consulta contenida dentro.
  const GetPostsMethod = () => {
    GetPostsAction();
  };
  /////////////////////////////////////////////////////////////////////

  //Definimos que al renderizar la pagina se dispare la accion que hace fetch de posts
  useEffect(() => {
    GetPostsMethod();
  }, []);

  //Definimos el componente que renderiza el listado de posts
  const posts = postSelector.posts;
  const loading = postSelector.loading;
  let postContent;

  if (posts === null || loading) {
    postContent = <Spinner />;
  } else {
    postContent = <PostFeed posts={posts} />;
  }

  return (
    <div className="feed">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {postContent}
            <PostForm />
          </div>
        </div>
      </div>
    </div>
  );
}

Posts.propTypes = {
  getPosts: ProptTypes.func.isRequired,
  post: ProptTypes.object.isRequired,
};

export default Posts;
