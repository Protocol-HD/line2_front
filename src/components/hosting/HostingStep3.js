import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HostingHeader from './HostingHeader';
import './HostingStep3.css';

function HostingStep3({ test, setTest }) {
    const checkInpolicyUrl = '/home/v1/home_policy/check_in';
    const checkOutpolicyUrl = '/home/v1/home_policy/check_out';
    const addShelterUrl2 = '/home/v1/home';
    const navigate = useNavigate();

    const [checkInTime, setCheckInTime] = useState('');
    const [checkOutTime, setCheckOutTime] = useState('');
    const [checkInpolicy, setcheckInPolicy] = useState([]);
    const [checkOutpolicy, setcheckOutPolicy] = useState([]);
    const [selectPolicy, setSeletPolicy] = useState([]);
    const [roomRule, setRoomRule] = useState('');
    const [roomDescription, setroomDescription] = useState('');

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

    const onSubmit = e => {
        e.preventDefault();
        console.log(selectPolicy)
        axios
            .post(addShelterUrl2, {
                ...test,
                homePolicies: selectPolicy,
                homePolicyCustom: roomRule,
                homeInformation: roomDescription,
            })
            .then(
                alert('등록 완료 되었습니다.'),
                console.log('등록완료'),
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
            setSeletPolicy(
                selectPolicy.filter(item => item !== e.target.id),
            );
        }
    };

    const checkedCheckOutHandler = e => {
        if (e.target.checked) {
            setSeletPolicy([...selectPolicy, e.target.id]);
        } else if (
            e.target.checked === false &&
            selectPolicy.find(item => item === e.target.id)
        ) {
            setSeletPolicy(
                selectPolicy.filter(item => item !== e.target.id),
            );
        }
    };

    return (
        <div className="hostingstep3">
            <HostingHeader />
            <div className="container">
                <form onSubmit={onSubmit}>
                    <div className="hostPolicy__time">
                        <h3>숙소 정책 입력</h3>
                        <h4>1. 체크인 정책</h4>
                        <FormControl sx={{ m: 2, minWidth: 700 }}>
                            <InputLabel>체크인 시간</InputLabel>
                            <Select
                                value={checkInTime}
                                onChange={handleCheckInTimeChange}
                            >
                                <MenuItem value={1}>7:00~12:00</MenuItem>
                                <MenuItem value={2}>13:00~19:00</MenuItem>
                                <MenuItem value={3}>19:00~20:00</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="hostPolicy__policy">
                        <h4>체크인 정책을 선택해 주세요(중복 선택 가능)</h4>
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

                    <div className="hostPolicy__time">
                        <h4>2. 체크 아웃 정책</h4>
                        <FormControl sx={{ m: 2, minWidth: 700 }}>
                            <InputLabel>체크아웃 시간</InputLabel>
                            <Select
                                value={checkOutTime}
                                onChange={handleCheckOutTimeChange}
                            >
                                <MenuItem value={1}>7:00~12:00</MenuItem>
                                <MenuItem value={2}>13:00~19:00</MenuItem>
                                <MenuItem value={3}>19:00~20:00</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="hostPolicy__policy">
                        <h4>체크아웃 정책을 선택해 주세요(중복 선택 가능)</h4>
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

                    <div className="hostPolicy__rule">
                        <h3>쉼터 생활 규칙</h3>
                        <h5>
                            쉼터의 생활 규칙이 있다면 500자 내외로 입력해 주세요
                        </h5>
                        <textarea
                            value={roomRule}
                            onChange={({ target: { value } }) =>
                                setRoomRule(value)
                            }
                        ></textarea>
                    </div>
                    <div className="hostPolicy__description">
                        <h3>간단한 쉼터소개</h3>
                        <textarea
                            value={roomDescription}
                            onChange={({ target: { value } }) =>
                                setroomDescription(value)
                            }
                        ></textarea>
                    </div>
                    <div className="hostingstep3__button">
                        <Button
                            variant="contained"
                            onClick={() => navigate('/hosting2')}
                        >
                            이전단계
                        </Button>
                        <Button variant="contained" type="submit">
                            등록완료
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default HostingStep3;
