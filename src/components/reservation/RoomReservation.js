import React, { useEffect, useRef, useState } from 'react';
import { Box, Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useSelector } from 'react-redux';
import { selectUser } from '../../_reducers';
import { DateRangePicker } from 'react-date-range';
import { ko } from 'date-fns/esm/locale';
import Swal from 'sweetalert2';

// const { Kakao } = window;

function RoomReservation(props) {
    const reservationUrl = '/book/v1/reservation';
    const headCountUrl = '/book/v1/reservation/head_count';
    const checkTimeUrl = '/home/v1/check_time/list';
    const reservationCalendarUrl = '/book/v1/reservation/calendar/';
    const now = new Date(Date.now());
    const [handelReservationModal, setHandelReservationModal] = useState(false);
    const [handelChangeDateModal, setHandelChangeDateModal] = useState(false);
    const [homeRoom, setHomeRoom] = useState({});
    const [headCount, setHeadCount] = useState([]);
    const [checkTime, setCheckTime] = useState([]);
    const [reservationCalendar, setReservationCalendar] = useState([]);
    const memo = useRef();
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
    const [endDate, setEndDate] = useState(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1));

    useEffect(() => {
        document.getElementById('fullcalendar_box').style.display = 'none';
        axios.get(checkTimeUrl).then(res => {
            setCheckTime(res.data);
        });
    }, []);

    useEffect(() => {
        props.home.rooms &&
            props.home.rooms.map(room => {
                axios
                    .post(headCountUrl, {
                        roomId: room.id,
                        checkIn: new Date(startDate),
                        checkOut: new Date(endDate),
                    })
                    .then(res => {
                        headCount[props.home.rooms.indexOf(room)] = res.data;
                    });
                if (user) {
                    if (room.gender !== user.userGender) {
                        document.getElementById(`reservation_button1_${room.id}`).style.display = 'none';
                        document.getElementById(`reservation_button2_${room.id}`).style.display = 'none';
                    }
                } else if (!user) {
                    navigate('/login');
                }
            });
    }, [props.home.rooms, handelChangeDateModal, headCount]);

    useEffect(() => {
        setTimeout(function () {
            openChangeDateModal();
            closeChangeDateModal();
        }, 2000);
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

    const openReservationModal = room => {
        setHandelReservationModal(true);
        setHomeRoom({
            homeId: props.home.homeId,
            roomId: room.id,
            homeName: props.home.homeName,
            homeAddress: props.home.homeAddress,
            roomName: room.roomName,
            checkIn:
                String(startDate.getFullYear()) +
                '??? ' +
                String(startDate.getMonth() + 1) +
                '??? ' +
                String(startDate.getDate()) +
                '??? ' +
                checkTime[props.home.checkInTimeId - 1],
            checkOut:
                String(endDate.getFullYear()) +
                '??? ' +
                String(endDate.getMonth() + 1) +
                '??? ' +
                String(endDate.getDate()) +
                '??? ' +
                checkTime[props.home.checkOutTimeId - 1],
        });
    };

    const handleSelect = ranges => {
        setStartDate(ranges.Selection.startDate);
        setEndDate(ranges.Selection.endDate);
    };
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'Selection',
    };

    const closeReservationModal = () => {
        setHandelReservationModal(false);
    };

    const openChangeDateModal = () => {
        setHandelChangeDateModal(true);
    };

    const closeChangeDateModal = () => {
        setHandelChangeDateModal(false);
    };

    const okReservation = () => {
        axios
            .post(reservationUrl, {
                homeId: props.home.homeId,
                roomId: homeRoom.roomId,
                userId: user.id,
                checkIn: new Date(startDate),
                checkOut: new Date(endDate.getTime() + 1000 * 3600 * 23 + 3599999),
                guestToHost: memo.current.value,
            })
            .then(res => {
                if (res.data.code === 1) {
                    Toast.fire({
                        icon: 'success',
                        title: '????????? ??????????????????.'
                      })
                    navigate('/');
                } else if (res.data.code === 3) {
                    alert('????????? ????????? ????????? ?????????????????????.');
                } else if (res.data.code === 4) {
                    alert('?????? ?????? ????????? ???????????????.');
                } else {
                    alert('?????? ????????? ????????? ?????????????????????.');
                }
            });
    };

    const openCalendar = id => {
        document.getElementById('fullcalendar_box').style.display = 'block';
        axios.get(reservationCalendarUrl + id).then(res => {
            setReservationCalendar(res.data);
        });
    };

    return (
        <>
            <p className={'title'}>?????? ?????? ??????</p>
            <div className={'contents_container'}>
                <div className={'row center'}>
                    <div>
                        <p className={'reservation_content_1'}>????????? ??????</p>
                        <p className={'reservation_content_2'}>
                            {startDate.getFullYear()}??? {startDate.getMonth() + 1}??? {startDate.getDate()}???
                        </p>
                        <p className={'reservation_content_3'}>{checkTime[props.home.checkInTimeId - 1]}</p>
                    </div>
                    <div>
                        <p className={'reservation_content_1'}>????????? ??????</p>
                        <p className={'reservation_content_2'}>
                            {endDate.getFullYear()}??? {endDate.getMonth() + 1}??? {endDate.getDate()}???
                        </p>
                        <p className={'reservation_content_3'}>{checkTime[props.home.checkOutTimeId - 1]}</p>
                    </div>
                    <div>
                        <p className={'reservation_content_1'}>??????</p>
                        <p className={'reservation_content_2'}>????????? 1???</p>
                    </div>
                    <button className={'reservation_change_button'} onClick={() => openChangeDateModal()}>
                        ?????? ??????
                    </button>
                </div>

                <Modal
                    className="reservation_modal_container"
                    open={handelChangeDateModal}
                    onClose={closeChangeDateModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className={'reservation_change_modal_box center'}>
                        <div className="reservation_date_picker_title">????????? ?????? ??????</div>
                        <DateRangePicker
                            locale={ko}
                            months={1}
                            ranges={[selectionRange]}
                            minDate={new Date()}
                            rangeColors={['#125b30']}
                            onChange={handleSelect}
                            staticRanges={[]}
                            inputRanges={[]}
                        />
                        <button className="guest_review_reservation_card_button" onClick={() => closeChangeDateModal()}>
                            ?????? ?????? ??????
                        </button>
                    </Box>
                </Modal>

                <table className={'reservation_table'}>
                    <thead>
                        <tr>
                            <th className={'table_room_name'} style={{ width: '20%' }}>
                                ?????? ??????
                            </th>
                            <th className={'table_room_gender'}>?????? ?????? ??????</th>
                            <th className={'table_room_max_head_count'} style={{ width: '10%' }}>
                                ??????
                            </th>
                            <th className={'table_room_available'} style={{ width: '10%' }}>
                                ?????? ??????
                            </th>
                            <th className={'table_room_button'} style={{ width: '20%' }}>
                                ?????? ??????
                            </th>
                            <th className={'table_room_button'} style={{ width: '20%' }}>
                                ??????
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.home.rooms &&
                            props.home.rooms.map(room => (
                                <tr key={room.id}>
                                    <td>{room.roomName}</td>
                                    <td>{room.gender ? '??????' : '??????'}</td>
                                    <td>{room.maxHeadCount}</td>
                                    <td id={'test_id'}>
                                        {headCount.length
                                            ? room.maxHeadCount - headCount[props.home.rooms.indexOf(room)]
                                            : 0}
                                    </td>
                                    <td>
                                        <button
                                            id={`reservation_button1_${room.id}`}
                                            className={'reservation_room_button'}
                                            onClick={() => openCalendar(room.id)}
                                        >
                                            ?????? ??????
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            id={`reservation_button2_${room.id}`}
                                            className={'reservation_room_button'}
                                            onClick={() => openReservationModal(room)}
                                        >
                                            ?????? ??????
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <div id="fullcalendar_box">
                    <div className="calendar_box">
                        <FullCalendar plugins={[dayGridPlugin]} events={reservationCalendar} contentHeight="420px" contentWidth="800px" />
                    </div>
                </div>
            </div>

            <Modal
                className="reservation_modal_container"
                open={handelReservationModal}
                onClose={closeReservationModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={'reservation_modal_box'}>
                    <div>
                        <p className={'center reservation_modal_text_color'}>????????? ?????????????????????????</p>
                        <p className={'reservation_modal_text'}>
                            ?????? ?????? ??? ?????? ????????? ???????????? ?????? ??? ??? ????????????.
                        </p>
                    </div>
                    <div>
                        <table className={'reservation_table'}>
                            <thead>
                                <tr>
                                    <td className="reservation_table_homeName">?????? ??????</td>
                                    <td className="reservation_table_homeAddress">?????? ??????</td>
                                    <td className="reservation_table_roomName">?????? ??????</td>
                                    <td className="reservation_table_checkIn">?????? ??????</td>
                                    <td className="reservation_table_chekcOut">?????? ??????</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{homeRoom.homeName}</td>
                                    <td>{homeRoom.homeAddress}</td>
                                    <td>{homeRoom.roomName}</td>
                                    <td>{homeRoom.checkIn}</td>
                                    <td>{homeRoom.checkOut}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={'center'}>
                        <p className={'reservation_modal_text'}>??????????????? ?????? ????????????</p>
                        <textarea
                            className={'reservation_modal_input'}
                            ref={memo}
                            placeholder="????????? ??????(???????????? ??????, ???????????? ????????????, ????????????, ???????????? ??????)???
                            ????????? ?????? ????????? 200??? ????????? ?????????????????? ????????? ????????? ?????????."
                        />
                    </div>
                    <div className={'center'}>
                        <button className={'reservation_room_button'} onClick={() => okReservation()}>
                            ?????? ??????
                        </button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}

export default RoomReservation;
