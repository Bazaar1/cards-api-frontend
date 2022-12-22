import React, {useEffect} from 'react';
import axios from "axios";
import images from "./images";

export default function Home() {
    const [cont, setCont] = React.useState([])

    useEffect(() => {
        getDataAxios().then(r => {
            setCont(r.data[0]);
        });
    }, []);

    return(
        <div className="container">
            <h3 className="title"> Card Database </h3>
            <div className="products-container">
                {cont.map((d, index) =>
                    <div key={d.id} className="product">
                        <img key={images.id} src={images[index].image}  alt={""}/>
                        <h3>{d.name}</h3>
                        <div className="price">{d.description}</div>
                    </div>)}
            </div>
        </div>
    );
}

function getDataAxios(){
    return axios.get("https://52.56.192.168:8080/cards/all")
}

