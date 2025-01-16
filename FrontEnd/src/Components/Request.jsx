import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../Utils/Constants';

const Request = () => {
    const [requestState, setRequestState] = useState([]); // Initialize as an empty array
    const [error, setError] = useState(null); // Error handling state

    // Fetch received requests
    const fetchRequests = async () => {
        try {
            const response = await axios.get(BASE_URL + "user/request/received", {
                withCredentials: true,
            });
            console.log(response.data);
            setRequestState(response.data);
        } catch (err) {
            console.error("Error fetching requests:", err);
            if (err.response && err.response.status === 404) {
                setError("No requests found");
            } else {
                setError("Failed to fetch requests");
            }
        }
    };

    // Review request (accept/reject)
    const reviewRequest = async (status, _id) => {
        try {
            await axios.post(`${BASE_URL}request/review/${status}/${_id}`, {}, {
                withCredentials: true,
            });
            // Remove the reviewed request from the state
            const updatedRequests = requestState.filter((request) => request._id !== _id);
            setRequestState(updatedRequests);
        } catch (err) {
            console.error("Error reviewing request:", err);
            setError("Failed to update request status");
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    // If there’s an error
    if (error) {
        return (
            <div className="flex justify-center items-center h-96">
                <p className="text-xl">{error}</p>
            </div>
        );
    }

    // If no requests are available
    if (requestState.length === 0) {
        return (
            <div className="flex justify-center items-center h-96">
                <p className="text-gray-500 text-lg">No requests found</p>
            </div>
        );
    }

    // Render requests
    return (
        <div className="flex flex-col justify-center items-center p-4">
            <h1 className="text-2xl lg:text-4xl md:text-3xl my-3 font-semibold text-primary">Received Requests</h1>
            {requestState.map((request, index) => {
                const { age, firstName, gender, lastName, about, imageUrl } = request.fromUserId;
                return (
                    <div key={index} className="bg-base-300 w-2/3 p-4 rounded-md mb-4 shadow-md">
                        <div className="flex gap-5 items-center">
                            <div>
                                <img className="w-28 h-28 rounded-full object-cover" src={imageUrl || "/placeholder.jpg"} alt={`${firstName}'s profile`} />
                            </div>
                            <div>
                                <p className="text-base lg:text-2xl md:text-xl font-bold my-2">{`${firstName} ${lastName}`}</p>
                                <p className="text-sm lg:text-base md:text-base">{`${age}, ${gender}`}</p>
                                <p className="text-sm lg:text-base md:text-base">{about}</p>
                                <div className="my-4">
                                    <button
                                        className="btn btn-sm btn-primary md:btn-md mr-3"
                                        onClick={() => reviewRequest("accepted", request._id)}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        className="btn btn-sm btn-neutral md:btn-md"
                                        onClick={() => reviewRequest("rejected", request._id)}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Request;
