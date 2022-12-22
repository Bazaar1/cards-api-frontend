import React, {useEffect, useState} from 'react';
import useToken from "./useToken";
import Login from "./Login";
import IsAuth from "./IsAuth";
import images from "./images";
import logo from "./1.png";
import axios from "axios";

export default function AddCards() {

    const [cardGen, setCardGen] = React.useState([])

    const { token, setToken } = useToken();

    const [ invalid, setInvalid ] = useState();

    const isAuth = IsAuth(token)

    const [code, setCode] = useState();

    const re = new RegExp('[A-Z0-9]{24}');

    const [visible, setVisible] = useState(true);

    if (!isAuth) {
        return <Login setToken={setToken} />
    }

    const removeElement = () => {
        setVisible((prev) => !prev);
    };

    const handleSubmit = async e => {
        e.preventDefault();
            const {genCards, invalid} = await generateCards(token, code, re).catch(
                e => e
            );
        setInvalid(invalid)
        try {
            setCardGen(genCards.data[0])
            removeElement()
        } catch (e) {
            console.warn(e)
        }
    }

    return(
        <div>
        <div className="login-wrapper">
            {visible && (
                <form onSubmit={handleSubmit}>
                    <label>
                        <h1>Enter Pack Code</h1>
                        <h1 style={{ color: 'red' }}>{invalid}</h1>
                        <input type="text" onChange={e => setCode(e.target.value)}/>
                    </label>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            )}
        </div>
            <div className="container">
                <div className="products-container">
                    {cardGen.map((d, index) =>
                        <div key={d.id} className="product">
                            {/*<img key={images.id} src={images[index].image}  alt={""}/>*/}
                            <img key={images.id} src={logo}  alt={logo}/>
                            <h3>{d.name}</h3>
                            <div className="price">{d.description}</div>
                        </div>)}
                </div>
            </div>
        </div>
    );
}

async function generateCards(token, code, re) {
    try {
        if (!re.exec(code)) {
            throw new Error("invalid pack code")
        }

    } catch (e) {
        return {
            genCards: null,
            invalid: "Incorrect Pack Code"
        };
    }
    try {
        const url = 'https://52.56.192.168:8080/cards/' + code
        console.log(url)
        const d =  await axios.get(url,
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            }
        );
        console.log("Logging data: ", d)
        return {
            genCards: d,
            invalid: null
        };
    } catch (e) {
        console.log(`Error! status: ${e}`)
        return {
            genCards: null,
            invalid: "Incorrect Pack Code"
        };
    }
}