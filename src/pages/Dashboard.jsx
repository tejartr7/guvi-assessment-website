import React, { useState, useEffect } from 'react'
import { auth, db } from '../firebase'
import { ref, set, get } from 'firebase/database'
import './dashboard.css'
import Header from '../components/Header'
import Footer from '../components/Footer'


const Dashboard = () => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const usersRef = ref(db, 'users/');
        async function fetchData() {
            try {
                const snapshot = await get(usersRef);
                if (snapshot.exists()) {
                    setUserData(Object.values(snapshot.val()));
                } else {
                    console.log("No data available");
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className='dashboard'>
            <Header />
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>DOB</th>
                        <th>Mobile</th>
                        <th>Country</th>
                    </tr>
                    <tr>
                        <th className="line"></th>
                        <th className="line"></th>
                        <th className="line"></th>
                        <th className="line"></th>
                        <th className="line"></th>
                        <th className="line"></th>
                        <th className="line"></th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((user, index) => (
                        <tr key={index}>
                            <td className="line">{user.username}</td>
                            <td className="line">{user.email}</td>
                            <td className="line">{user.age}</td>
                            <td className="line">{user.gender}</td>
                            <td className="line">{user.dob}</td>
                            <td className="line">{user.mobile}</td>
                            <td className="line">{user.country}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="8"></td>
                    </tr>
                </tfoot>
            </table>
            <Footer />
        </div>
    )
}

export default Dashboard
