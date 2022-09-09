import axios from "axios";

const useStation = () => {
  let response,
    error = "";
  axios
    .post(
      "https://opendata.nationalrail.co.uk/authenticate",
      {
        username: "edward.chung.designer@gmail.com",
        password: "Cooprint123!",
      },
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    )
    .then((res) => {
      console.log("RESPONSE RECEIVED: ", res);
      response = res;
    })
    .catch((err) => (error = err));
  return { response, error };
};

export default useStation;
