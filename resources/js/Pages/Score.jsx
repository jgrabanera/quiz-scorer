import Options from "@/Components/Options";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
const socket = io("http://10.10.141.77:3001");

const score = () => {
    const [students, setStudents] = useState([]);
    const [qNumber, setqNumber] = useState(1);
    const [level, setLevel] = useState(1);
    const [isFinal, setIsFinal] = useState(0);
    const [checkedStudents, setCheckedStudents] = useState([]);
    const debounceRef = useRef(null);
    const stages = [
        {
            value: 0,
            label: "Semi Finals",
        },
        {
            value: 1,
            label: "Finals",
        },
    ];

    const difficulties = [
        {
            score: 1,
            label: "Easy",
        },
        {
            score: 3,
            label: "Average",
        },
        {
            score: 5,
            label: "Difficult",
        },
    ];
    const [mySocketId, setMySocketId] = useState(null);

    useEffect(() => {
        socket.on("connect", () => {
            setMySocketId(socket.id);
        });

        return () => socket.off("connect");
    }, []);

    useEffect(() => {
        socket.on("chat message", (data) => {
            if (data.number === qNumber && data.senderId !== mySocketId && data.stage === isFinal) {
                setCheckedStudents(prev =>
                    data.status === 'Inserted'
                        ? [...prev, data.name]
                        : prev.filter(n => n !== data.name)
                );
            }
        });

        return () => socket.off("chat message");
    }, [qNumber, mySocketId]);



    useEffect(() => {
        loadStudents();
        loadEvents();
    }, [isFinal]);

    useEffect(() => {
        if (qNumber !== 0)
            loadCheckedStudents();
    }, [qNumber, isFinal]);

    const loadStudents = () => {
        axios.get("/students/" + isFinal).then((response) => {
            setStudents(response.data);
        }).catch((error) => {
            alert("❌ Error: Failed to load students.");
        })
    }

    const loadEvents = () => {
        axios.get("/events")
            .then((response) => {
                setIsFinal(response.data.is_final);
                setqNumber(response.data.number);
                setLevel(response.data.level);
            })
            .catch((error) => {
                alert("❌ Error: Failed to load events.");
            });
    }

    const loadCheckedStudents = () => {
        axios.get('/load-checked-students/' + qNumber + '/' + isFinal).then(
            res => {
                const names = res.data.map(student => student.name);
                setCheckedStudents(names);
                if (res.data.length > 0) {
                    setLevel(res.data[0].score);
                }
            }
        )
    }

    const handleDifficultyChange = (e) => {
        const formData = new FormData();
        formData.append('level', e.target.value)
        axios.post('/update-difficulty', formData).then(
            setLevel(e.target.value)
        ).catch((error) => {
            alert("❌ Error: Failed to update difficulty.");
        });
    }

    const handleStageChange = (e) => {
        const formData = new FormData();
        formData.append('stage', e.target.value)
        axios.post('/update-stage', formData).then(
            res => {
                setIsFinal(e.target.value)
                resetItems()
                setqNumber(1)
            }
        ).catch((error) => {
            alert("❌ Error: Failed to update stage.");
        });
    }

    const resetItems = () => {
        axios.post('/reset-items').then(
            res => {
                setqNumber(1)
            }
        )
    }

    const toggleStudentCheck = (name) => {
        const formData = new FormData();
        formData.append('name', name)
        formData.append('number', qNumber)
        formData.append('level', level)
        formData.append('stage', isFinal)
        axios.post('/toggle-student-check', formData).then(
            res => {
                setCheckedStudents(prev =>
                    res.data.status === 'Inserted'
                        ? [...prev, name]
                        : prev.filter(n => n !== name)
                );
                socket.emit("chat message", {
                    name,
                    number: qNumber,
                    stage: isFinal,
                    senderId: socket.id,
                    status: res.data.status
                });
            }
        )
    }

    const navigateQuestion = (actions) => {
        const number = actions === 1 ? qNumber + 1 : qNumber - 1;
        const formData = new FormData();
        formData.append('actions', actions)
        axios.post('/navigate-questions', formData).then(
            res => {
                setqNumber(number)
            }
        )

        if (isFinal == 0) {
            if (number <= 10) {
                setLevel(1)
            }
            else if (number > 10 && number <= 20) {
                setLevel(3)
            }
            else if (number > 20) {
                setLevel(5)
            }
        }
        else {
            if (number <= 5) {
                setLevel(1)
            }
            else if (number > 5 && number <= 10) {
                setLevel(3)
            }
            else if (number > 10) {
                setLevel(5)
            }
        }



    }

    const jumpTo = (e) => {
        const value = e.target.value;
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            axios.get('/jump-to/' + value)
                .then(() => {
                    setqNumber(value)
                });
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-blue-50 p-6 relative">
            {/* Header */}
            <div className="w-full gap-4 mb-6 ">
                <ApplicationLogo className="w-64 mx-auto" />
                <h1 className="text-2xl font-bold text-gray-800 drop-shadow">
                    Question No. {qNumber}
                </h1>
                <Link href="/dashboard">
                    <div className="bg-blue-400 rounded-lg shadow-md px-4 py-2 w-fit text-white absolute md:top-4 md:left-4 top-1 left-1">
                        Back
                    </div>
                </Link>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-blue-400 border border-yellow-400 rounded-lg p-4 shadow-md mb-6">
                <div className="flex flex-row gap-2">
                    <Options
                        id="difficulty"
                        items={difficulties}
                        itemValue="score"
                        itemName="label"
                        name="difficulty"
                        value={level}
                        onChange={handleDifficultyChange}
                    />
                    <Options
                        id="stage"
                        items={stages}
                        itemValue="value"
                        itemName="label"
                        name="stage"
                        value={isFinal}
                        onChange={handleStageChange}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        className={`px-4 py-2 rounded font-semibold text-white transition ${qNumber > 1 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                        disabled={qNumber <= 1}
                        onClick={() => navigateQuestion(0)}
                    >
                        Prev
                    </button>

                    <input
                        type="text"
                        placeholder="Jump to"
                        onChange={jumpTo}
                        className="w-24 sm:w-32 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />

                    <button
                        type="button"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold transition"
                        onClick={() => navigateQuestion(1)}
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Student Grid */}
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

    );
};

export default score;
