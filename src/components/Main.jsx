import React, { useState, useEffect } from 'react';
import '../styles.css';
import Navbar from './Header';
import Footer from './Footer';
import { ref, get, set } from "firebase/database";
import { db } from '../firebase';
import { x } from '../context/AuthContext';

function Main() {
    let k = x.email.split(".");
    let m = k[0];
    const [myData, setMyData] = useState(() => {
        const dataFromStorage = window.localStorage.getItem(m);
        return dataFromStorage ? JSON.parse(dataFromStorage) : {
            username: "",
            email: "",
            dob: "",
            age: '',
            gender: '',
            mobile: '',
            country:'',
        };
    });
    const writeUserData = async () => {
        set(ref(db, "users/" + m), {
            username: myData.username,
            email: myData.email,
            dob: myData.dob,
            age: myData.age,
            gender: myData.gender,
            mobile: myData.mobile,
            country:myData.country,
        });
    }
    const [editableField, setEditableField] = useState('');

    const handleUpdateClick = (fieldName) => {
        setEditableField(fieldName);
    };

    const handleInputChange = async (event) => {
        const { name, value } = event.target;
        const updatedData = { ...myData, [name]: value };
        setMyData(updatedData);
        await writeUserData();
    };

    const handleInputBlur = () => {
        setEditableField('');
    };
    useEffect(() => {
        let temp = "users/" + m;
        const usersRef = ref(db, temp);
        async function fetchData() {
            try {
                const snapshot = await get(ref(db, temp));
                if (snapshot.exists()) {
                    setMyData(snapshot.val());
                    console.log(myData)
                    localStorage.setItem('myData', JSON.stringify(myData));
                } else {
                    console.log("No data available");
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [m]);


    const attributes = [
        { label: 'Name:', name: 'username' },
        { label: 'D.O.B:', name: 'dob' },
        { label: 'Age:', name: 'age' },
        { label: 'Gender:', name: 'gender' },
        { label: 'Mobile:', name: 'mobile' },
        { label: 'Country:', name: 'country' },
    ];

    return (
        <>
            <Navbar />
            <div className='box-main'>
                <div className="container-main">
                    Personal Data
                    <p>when you are updating the values add space at the end</p>
                    {attributes.map((attribute) => (
                        <div key={attribute.name}>
                            <div className='attribute'>{attribute.label}</div>
                            <input
                                type='text'
                                name={attribute.name}
                                value={myData[attribute.name]}
                                onChange={handleInputChange}
                                onBlur={handleInputBlur}
                                disabled={editableField !== attribute.name}
                                className='user-input'
                            />

                            <button
                                className='update-button'
                                onClick={() => handleUpdateClick(attribute.name)}
                            >
                                Update
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Main;
