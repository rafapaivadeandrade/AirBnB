import React, {useState , useMemo} from 'react';
import api from '../../services/api';
import './index.css';
import camera from '../../assets/camera.svg';

export default function New({history}){
    const [thumbnail,setThumbnail] = useState('');
    const [hostel,sethostel] = useState('');
    const [beds,setbeds] = useState('');
    const [price,setPrice] = useState('');

    const preview = useMemo(
        () => {
            return thumbnail ? URL.createObjectURL(thumbnail) : null
        }, [thumbnail]
    )

    async function handlesubmit(event){
        event.preventDefault();
        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail',thumbnail);
        data.append('hostel',hostel);
        data.append('beds',beds);
        data.append('price',price);

     await api.post('/spots',data ,{
            headers : {user_id}
        })
        history.push('/dashboad');
    }
    return (
        <form onSubmit = {handlesubmit}>
            <label  id="thumbnail" style={{backgroundImage: `url(${preview})`}} className={thumbnail ? 'has-thumbnail': ''}>
                <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
                <img src={camera} alt="Select img"/>
            </label>
            <label htmlFor="hostel">Hostel *</label>
            <input
                id="hostel"
                placeholder="Your hostel"
                value = {hostel}
                onChange= {event => sethostel(event.target.value)}
            />

            <label htmlFor="beds">Beds *<span>(Separated by comma)</span></label>
            <input
                id="beds"
                placeholder="Which beds?"
                value = {beds}
                onChange= {event => setbeds(event.target.value)}
            />
            <label htmlFor="price">Daily Price *<span>(Empty for free)</span></label>
            <input
                id="price"
                placeholder="Value per day"
                value = {price}
                onChange= {event => setPrice(event.target.value)}
            />
            <button type = "submit" className = "btn">Register</button>
        </form>
    )

}