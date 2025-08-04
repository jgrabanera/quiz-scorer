import Options from "@/Components/Options";
import ResetToZero from "@/Components/ResetToZero";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

const score = () => {
    const [students, setStudents] = useState([]);
    const [qNumber, setqNumber] = useState();
    const [level, setLevel] = useState(0);
    const [isFinal, setIsFinal] = useState(0);
    const [checkedStudents, setCheckedStudents] = useState([]);
    const btnStyle = ' text-white  hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 '
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
            if (data.number === qNumber && data.senderId !== mySocketId) {
                setCheckedStudents(prev =>
                    data.status === 'Inserted'
                        ? [...prev, data.name]
                        : prev.filter(n => n !== name)
                );
            }
        });

        return () => socket.off("chat message");
    }, [qNumber, mySocketId]); 



    useEffect(() => {
        loadStudents();
        loadEvents();
        loadCheckedStudents();
    }, []);

    useEffect(() => {
        loadCheckedStudents();
    }, [qNumber]);

    const loadStudents = () => {
        axios.get("/students").then((response) => {
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
        axios.get('/load-checked-students/'+qNumber).then(
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
                    senderId: socket.id,
                    status: res.data.status
                });
            }
        )
    }

    const navigateQuestion = (actions) => {
        const formData = new FormData();
        formData.append('actions', actions)
        axios.post('/navigate-questions', formData).then(
            res => {
                setqNumber(actions === 1 ? qNumber + 1 : qNumber - 1)
            }
        )
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
        <div>
            <div className="p-2">
                <div className="w-full bg-blue-200 p-3 text-3xl text-center font-bold flex justify-center items-center  gap-2">
                    <ResetToZero
                        qNumber={qNumber}
                        setqNumber={setqNumber}
                        name={"Reset Q"}
                    />

                    <h1>Question no. {qNumber}</h1>
                </div>

                <br />
                <div className="flex flex-row justify-between items-center ">
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

                    <div className="flex justify-center flex-row items-center">
                        <button
                            type="button"
                            className={`${btnStyle} ${qNumber > 1 ? 'bg-blue-700' : 'bg-gray-400'}`}
                            disabled={qNumber <= 1}
                            onClick={() => navigateQuestion(0)}
                        >
                            Prev
                        </button>
                        <input type="text"
                            placeholder="Jump to"
                            onChange={jumpTo}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block
                            mx-2 w-full p-2.5"
                        />
                        <button
                            type="button"
                            className={`${btnStyle} bg-blue-700`}
                            onClick={() => navigateQuestion(1)}>
                            Next
                        </button>
                    </div>

                </div>
                <br />
                <div className="">
                    <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-10 gap-2">
                        {students.map((student, index) => {
                            const isChecked = checkedStudents.includes(student.name);
                            return (
                                <div
                                    key={index}
                                    onClick={() => toggleStudentCheck(student.name)}
                                    className={`text-center p-4 rounded shadow cursor-pointer transition-all duration-200 ${isChecked ? 'bg-green-400' : 'bg-gray-200 '
                                        }`}
                                >
                                    <span className="font-bold">{student.id}</span>
                                    <span className="text-xs line-clamp-2 capitalize block">{student.name}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default score;
