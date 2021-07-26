import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProptTypes from "prop-types";
import TextAreaFieldGroup from "../common/textAreaFieldGroup";
import { addPost } from "../../redux/actions/postActions";
import { useHistory } from "react-router-dom";
import { addComment } from "../../redux/actions/postActions";

function CommentForm(props) {
  //Definimos state para el componente text y errors
  const [text, setText] = useState("");
  const [errors, setErrors] = useState({});

  //Definimos los selector que vamos a necesitar
  //Definimos el auth selector
  const authSelector = useSelector((state) => state.auth);
  //Definimos el post selector
  const postSelector = useSelector((state) => state.post);
  //Definimos el post selector
  const errorSelector = useSelector((state) => state.errors);
  //Seleccionamos el id del single comment
  const postId = postSelector.post._id;

  //Definimos los errores en caso que la forma este vacia
  let errorsFetched;
  if(errorSelector.errors) {
    errorsFetched = errorSelector.errors.text
  }

  /////////////////////////////////////////////////////////////////
  //SEGUNDO: DISPARO DE ACTIONS//////////////////////////////////
  //Disparando la accion de postear comentario
  //1. Llamamos dispatch para disparar nuestra accion de consulta
  const dispatch = useDispatch();

  //2. Definimos la funcionalidad "history" que nos permitira hacer REDIRECT
  const history = useHistory();

  //3. Definimos la accion que queremos que dispatch dispare (traemos la action de postear comentario desde redux). Esta accion se va a disparar en el item 3
  const PostCommentAction = (postId, newComment) =>
    dispatch(addComment(postId, newComment));

  //4. Una vez definida la accion que postea el Comentario en el state de redux, la incluimos dentro de un metodo. Cuando llamamos este metodo, se disparara la accion de consulta contenida dentro.
  const PostCommentMethod = (postId, newComment) => {
    PostCommentAction(postId, newComment);
  };
  /////////////////////////////////////////////////////////////////////

  //Definimos el metodo onChange que captura lo escrito y lo guarda dentro de text
  const onChangePost = (e) => {
    setText(e.target.value);
  };

  //Definimos el metodo submit para la form
  const onSubmitPost = (e) => {
    e.preventDefault();

    const newComment = {
      text: text,
      name: authSelector.user.name,
      avatar: authSelector.user.avatar,
    };
    PostCommentMethod(postId, newComment);
    setText(" ");
  };

  return (
    <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-info text-white">Make a comment...</div>
        <div className="card-body">
          <form onSubmit={onSubmitPost}>
            <div className="form-group">
              <TextAreaFieldGroup
                placeholder="Reply to Post"
                name="text"
                value={text}
                onChange={onChangePost}
                error={errorsFetched}
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

CommentForm.propTypes = {
  addPost: ProptTypes.func.isRequired,
  postId: ProptTypes.string.isRequired,
  auth: ProptTypes.object.isRequired,
  errors: ProptTypes.object.isRequired,
};

export default CommentForm;
