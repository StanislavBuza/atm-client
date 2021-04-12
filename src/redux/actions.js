import axios from "axios";

export function getUserByAccountId(accountNumber) {
    return (dispatch) => {
        axios.get(`http://localhost:5000/user/${accountNumber}`)
            .then(result => {
                dispatch({type: "GET_USER", payload: result.data});
            })
            .catch(err => console.log(err))
    }

}

export function userUpdateSelf(accountNumber, newBalance) {
    return (dispatch) => {
        axios.patch(`http://localhost:5000/user/${accountNumber}`, {balance: newBalance})
            .then(() => {
                dispatch(getUserByAccountId(accountNumber));
            })
            .catch(err => console.log(err))
    }

}

export function usersSearch(searchValues) {
    return (dispatch) => {
        axios.post("http://localhost:5000/user/search", {...searchValues})
            .then((result) => {
                dispatch({type: "USER_SEARCH", payload: result.data});
            })
            .catch(err => console.log(err))
    }
}

export function userCreate(user) {
    return (dispatch) => {
        axios.post("http://localhost:5000/user",{...user})
            .then(() => {
                dispatch(usersSearch({}));
            })
            .catch(err => console.log(err))
    }
}

export function userDelete(accountNumber) {
    return (dispatch) => {
        axios.delete(`http://localhost:5000/user/${accountNumber}`)
            .then(() => {
                dispatch(usersSearch({}));
            })
            .catch(err => console.log(err))
    }
}

export function userUpdate({name, account,balance}) {
    return (dispatch) => {
        axios.patch(`http://localhost:5000/user/${account}`,{name,balance})
            .then(() => {
                dispatch(usersSearch({}));
            })
            .catch(err => console.log(err))
    }
}