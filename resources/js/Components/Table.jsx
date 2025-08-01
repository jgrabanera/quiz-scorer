import React from "react";

const Table = () => {
    return (
        <>
            <table className="w-full">
                <tbody>
                    {tblStudent.map((student, index) => (
                        <tr
                            key={student.id}
                            className="flex justify-center items-center border-b-2 py-2"
                        >
                            <td className="font-bold max-w-[300px] w-full text-sm">
                                <span className="font-normal text-xs">
                                    {index + 1}.{" "}
                                </span>
                                {student.name}
                            </td>
                            <td>
                                {save ? <FaCircleCheck /> : ""}
                                <GreenButton
                                    student={student.name}
                                    level={level}
                                    qNumber={qNumber}
                                    name={"Correct"}
                                    onClick={() => handleCorrect}
                                />
                            </td>
                            {/* <td>
                                    <RedButton name={"Wrong"} />
                                </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Table;
