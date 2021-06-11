export const FETCH_DATA = "FETCH_DATA";

export const fetchData = () => {
    return async (dispatch) => {
        await fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((data) =>
                dispatch({
                    type: FETCH_DATA,
                    payload: data,
                })
            )
            .catch((err) => console.log(err));
    };
};
