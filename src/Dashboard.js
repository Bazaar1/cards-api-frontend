import React, {useEffect} from 'react';
import axios from "axios";
import images from "./images";
import useToken from "./useToken";
import Login from "./Login";
import IsAuth from "./IsAuth";
import logo from "./1.png";

export default function Dashboard() {
    const { token, setToken } = useToken();
    const [userCont, setUserCont] = React.useState([])

    useEffect(() => {
        getDataAxiosUser(token).then(r => {
            console.log("Data", r.data[0])
            setUserCont(r.data[0])
        }).catch(
            e => e
        );
    }, [token]);

    const isAuth = IsAuth(token, setToken)

    if (!isAuth) {
        return <Login setToken={setToken} />
    }

    // const { exp } = jwt(token)
    //
    // if (Math.round(Date.now() / 1000) >= exp) {
    //     return <Login setToken={setToken} />
    // }
    //
    // if(!token) {
    //     return <Login setToken={setToken} />
    // }

    return(
        <div className="container">
            <h3 className="title"> Card Database </h3>
            <div className="products-container">
                {userCont.map((d, index) =>
                    <div key={d.id} className="product">
                        {/*<img key={images.id} src={images[index].image}  alt={""}/>*/}
                        <img key={images.id} src={logo}  alt={logo}/>
                        <h3>{d.name}</h3>
                        <div className="price">{d.description}</div>
                    </div>)}
            </div>
        </div>
    );
}

async function getDataAxiosUser(token) {
    try {
        return await axios.get('http://52.56.192.168:443/cards/me',
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            }
            );

    } catch (e) {
        console.log(`Error! status: ${e}`)
    }
}