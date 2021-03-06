import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

function HostingStep3({ test, setTest }) {
    const checkInpolicyUrl = '/home/v1/home_policy/check_in';
    const checkOutpolicyUrl = '/home/v1/home_policy/check_out';
    const addShelterUrl2 = '/home/v1/home';
    const checkTimeUrl = '/home/v1/check_time/list';
    const navigate = useNavigate();

    const [checkInTime, setCheckInTime] = useState('');
    const [checkOutTime, setCheckOutTime] = useState('');
    const [checkInpolicy, setcheckInPolicy] = useState([]);
    const [checkOutpolicy, setcheckOutPolicy] = useState([]);
    const [selectPolicy, setSeletPolicy] = useState([]);
    const [roomRule, setRoomRule] = useState('');
    const [roomDescription, setroomDescription] = useState('');
    const [checkTime, setCheckTime] = useState([]);

    useEffect(() => {
        axios.get(checkInpolicyUrl).then(res => {
            setcheckInPolicy(res.data);
        });
    }, []);

    useEffect(() => {
        axios.get(checkOutpolicyUrl).then(res => {
            setcheckOutPolicy(res.data);
        });
    }, []);

    useEffect(() => {
        axios.get(checkTimeUrl).then(res => {
            setCheckTime(res.data);
        })
    }, []);

    const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    const onSubmit = e => {
        e.preventDefault();
        axios
            .post(addShelterUrl2, {
                ...test,
                homePolicies: selectPolicy,
                homePolicyCustom: roomRule,
                homeInformation: roomDescription,
                checkInTimeId: checkInTime + 1,
                checkOutTimeId: checkOutTime + 1
            })
            .then(
                Toast.fire({
                    icon: 'success',
                    title: '?????? ?????? ??????'
                  }),
                navigate('/'),
            );
    };

    const handleCheckInTimeChange = event => {
        setCheckInTime(event.target.value);
    };

    const handleCheckOutTimeChange = event => {
        setCheckOutTime(event.target.value);
    };

    const checkedCheckInHandler = e => {
        if (e.target.checked) {
            setSeletPolicy([...selectPolicy, e.target.id]);
        } else if (
            e.target.checked === false &&
            selectPolicy.find(item => item === e.target.id)
        ) {
            setSeletPolicy(selectPolicy.filter(item => item !== e.target.id));
        }
    };

    const checkedCheckOutHandler = e => {
        if (e.target.checked) {
            setSeletPolicy([...selectPolicy, e.target.id]);
        } else if (
            e.target.checked === false &&
            selectPolicy.find(item => item === e.target.id)
        ) {
            setSeletPolicy(selectPolicy.filter(item => item !== e.target.id));
        }
    };

    return (
        <div className="hostingstep3">
            <div className="header_section"><p>?????? ?????? step 3</p></div>
            <div className="container">
                <form onSubmit={onSubmit}>
                    <div className="host_policy_time">
                        <h3>?????? ?????? ??????</h3>
                        <h4>1. ?????? ??????</h4>
                        <FormControl sx={{ m: 2, minWidth: 700 }}>
                            <InputLabel>?????? ??????</InputLabel>
                            <Select
                                value={checkInTime}
                                onChange={handleCheckInTimeChange}
                            >
                                {
                                    checkTime && checkTime.map((time, index) => (
                                        <MenuItem key={index} value={index}>{time}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <div className="host_policy_policy">
                        <h4>?????? ????????? ????????? ?????????(?????? ?????? ??????)</h4>
                        {checkInpolicy.map(policy => (
                            <label key={policy.id}>
                                <input
                                    type="checkbox"
                                    id={policy.id}
                                    onChange={checkedCheckInHandler}
                                />
                                {policy.homePolicy}
                            </label>
                        ))}
                    </div>

                    <div className="host_policy_time">
                        <h4>2. ?????? ??????</h4>
                        <FormControl sx={{ m: 2, minWidth: 700 }}>
                            <InputLabel>?????? ??????</InputLabel>
                            <Select
                                value={checkOutTime}
                                onChange={handleCheckOutTimeChange}
                            >
                                {
                                    checkTime && checkTime.map((time, index) => (
                                        <MenuItem key={index} value={index}>{time}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <div className="host_policy_policy">
                        <h4>?????? ????????? ????????? ?????????(?????? ?????? ??????)</h4>
                        {checkOutpolicy.map(policy => (
                            <label key={policy.id}>
                                <input
                                    type="checkbox"
                                    id={policy.id}
                                    onChange={checkedCheckOutHandler}
                                />
                                {policy.homePolicy}
                            </label>
                        ))}
                    </div>

                    <div className="host_policy_rule">
                        <h3>?????? ?????? ??????</h3>
                        <h5>
                            ????????? ?????? ????????? ????????? 500??? ????????? ????????? ?????????
                        </h5>
                        <textarea
                            value={roomRule}
                            onChange={({ target: { value } }) =>
                                setRoomRule(value)
                            }
                        ></textarea>
                    </div>
                    <div className="host_policy_description">
                        <h3>????????? ????????????</h3>
                        <textarea
                            value={roomDescription}
                            onChange={({ target: { value } }) =>
                                setroomDescription(value)
                            }
                        ></textarea>
                    </div>
                    <div className="hostingstep3_button">
                        <Button
                            variant="contained"
                            onClick={() => navigate('/hosting2')}
                        >
                            ????????????
                        </Button>
                        <Button variant="contained" type="submit">
                            ????????????
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default HostingStep3;
