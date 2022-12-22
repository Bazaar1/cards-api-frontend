import jwt from "jwt-decode";

export default function IsAuth(token) {
    console.log("inside IsAuth")

    let exp
    try {
        exp = jwt(token)
    } catch (e) {
        return false
    }

    console.log("EXP: ",exp["exp"])
    console.log("NOW: ",Math.round(Date.now() / 1000))

    if (Math.round(Date.now() / 1000) >= exp["exp"]) {
        localStorage.removeItem('token');
        return false
    }

    if(!token) {
        localStorage.removeItem('token');
        return false
    }
    return true
}
