import jwt from "jwt-decode";

export default function IsAuth(token) {
    console.log("inside IsAuth")

    let exp
    try {
        exp = jwt(token)
    } catch (e) {
        console.log("return 1: ", e)
        return false
    }

    console.log("EXP: ",exp["exp"])
    console.log("NOW: ",Math.round(Date.now() / 1000))

    if (Math.round(Date.now() / 1000) >= exp["exp"]) {
        localStorage.removeItem('token');
        console.log("return 2")
        return false
    }

    if(!token) {
        localStorage.removeItem('token');
        console.log("return 3")
        return false
    }
    console.log("return 4")
    return true
}
