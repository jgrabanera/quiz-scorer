import React from 'react'
import ApplicationLogo from '@/Components/ApplicationLogo';
import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
function Finalist() {
    const [students, setStudents] = useState([]);
    const [checkedStudents, setCheckedStudents] = useState([]);


    useEffect(() => {
        loadFinalist()
        getFinalist()
    }, []);

    const loadFinalist = () => {
        axios.get("/fetch-students").then((response) => {
            setStudents(response.data);
        }).catch((error) => {
            alert("❌ Error: Failed to load students.");
        })
    }

    const getFinalist = () => {
        axios.get("/get-finalist").then((response) => {
            setCheckedStudents(response.data)
        })
    }
    const toggleStudentCheck = (name) => {
        const formData = new FormData();
        formData.append('name', name)

        axios.post('/toggle-student-finalist', formData).then(
            res => {
                setCheckedStudents(prev =>
                    res.data.status === 'Inserted'
                        ? [...prev, name]                     
                        : prev.filter(n => n !== name)        
                );
            }
        )
    }
    return (
        <div className='bg-blue-200 p-5 min-h-screen'>
            {/* Student Grid */}
            <div className="flex justify-between gap-3">
                <Link href="/dashboard">
                    <div className="bg-blue-500 rounded-lg shadow-md px-4 py-2 w-fit text-white font-bold">
                        Back
                    </div>
                </Link>
            </div>
            <ApplicationLogo className="w-80 mb-6 mx-auto" />
            <h2 className=' text-2xl text-center py-4  px-8 bg-blue-500 text-white  border-2 border-yellow-500  rounded-xl mb-5 font-semibold'>
                Set Finalist
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-10 gap-3">
                {students.map((student, index) => {
                    const isChecked = checkedStudents.includes(student.name);
                    return (
                        <div
                            key={index}
                            onClick={() => toggleStudentCheck(student.name)}
                            className={`p-4 rounded-xl shadow-sm cursor-pointer transition transform hover:scale-105 text-center  ${isChecked
                                ? 'bg-blue-500 text-white border-yellow-400 border-2'
                                : 'bg-white text-gray-800 border-blue-300 hover:bg-gray-100 border'
                                }`}
                        >
                            <div className="font-bold text-lg">{student.id}</div>
                            <div className="text-sm capitalize line-clamp-2">{student.name}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Finalist