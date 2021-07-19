import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProptTypes from "prop-types";
import TextAreaFieldGroup from "../common/textAreaFieldGroup";
import { addPost } from "../../redux/actions/postActions";
import { useHistory } from "react-router-dom";

function PostForm() {

    //Definimos state para el componente text y errors
  const [text, setText] = useState("");
  const [errors, setErrors] = useState({});

  //Definimos los selector que vamos a necesitar
    //Definimos el auth selector
    const authSelector = useSelector((state) => state.auth);

    /////////////////////////////////////////////////////////////////
  //SEGUNDO: DISPARO DE ACTIONS//////////////////////////////////
  //Disparando la accion de postear comentario
  //1. Llamamos dispatch para disparar nuestra accion de consulta
  const dispatch = useDispatch();

  //2. Definimos la funcionalidad "history" que nos permitira hacer REDIRECT
  const history = useHistory();

  //3. Definimos la accion que queremos que dispatch dispare (traemos la action de postear comentario desde redux). Esta accion se va a disparar en el item 3
  const PostCommentAction = (newPost) =>
    dispatch(addPost(newPost));

  //4. Una vez definida la accion que postea el Comentario en el state de redux, la incluimos dentro de un metodo. Cuando llamamos este metodo, se disparara la accion de consulta contenida dentro.
  const PostCommentMethod = (newPost) => {
    PostCommentAction(newPost);
  };
  /////////////////////////////////////////////////////////////////////

  //Definimos el metodo onChange que captura lo escrito y lo guarda dentro de text
  const onChangePost = (e) => {
      setText(e.target.value)
  }

  //Definimos el metodo submit para la form
  const onSubmitPost = (e) => {
      e.preventDefault();

      const newPost = {
          text: text,
          name: authSelector.user.name,
          avatar: authSelector.user.name
      }
      PostCommentMethod(newPost);
      setText(' ');
      console.log('submit post');
  }

  return (
    <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-info text-white">Say Somthing...</div>
        <div className="card-body">
          <form onSubmit={onSubmitPost}>
            <div className="form-group">
              <TextAreaFieldGroup
              placeholder='Create a Post'
              name='text'
              value={text}
              onChange={onChangePost}
              error={errors.text}
              />
            </div>
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

PostForm.propTypes = {
    addPost: ProptTypes.func.isRequired,
    auth: ProptTypes.object.isRequired,
    errors: ProptTypes.object.isRequired
}

export default PostForm;
