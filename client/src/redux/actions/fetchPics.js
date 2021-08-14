import axios from "axios";

//Definimos el API KEY que necesitamos
const API_KEY = "P_ajk_BIixUFqVdP5Lve8IwFEKLFPNBwRz_-yYhyakc";
//Exportamos el type
export const FETCH_UNPLASH = "FETCH_UNPLASH";

//Definimos el action creator y le pasamos city
//para que pueda usarlo axios.get
export default function grabUnplash() {
  const request = axios.get(
    `https://api.unsplash.com/search/photos?query=developer&client_id=${API_KEY}`
  );

  //Lo levantado por la API se llamara data.
  //Se dispara una accion llamada FETCH_WEATHER que de ser
  //admitida por el reducer modificara el state con lo que
  //contenga el payload: es decir data, es decir lo levantado
  //por la API
  return (dispatch) => {
    request.then(({ data }) => {
      dispatch({ type: "FETCH_UNPLASH", payload: data });
      console.log(data);
    });
  };
}
