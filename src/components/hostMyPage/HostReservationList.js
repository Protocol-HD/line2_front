import React, { useState, useEffect } from 'react';
import HostProfile from './HostProfile';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../_reducers';
import { Box, Modal } from '@mui/material';
import Swal from 'sweetalert2';

function HostReservationList() {
    const reservationBeforeUrl = '/book/v1/reservation/home/before_check_in/';
    const checkInUrl = '/book/v1/reservation/accept_check_in';
    const denyUrl = '/book/v1/reservation/deny';
    const homeUrl = '/home/v1/home/user/';

    const [reservation, setReservation] = useState([]);
    const [reservationId, setReservationId] = useState(0);
    const [checkInModal, setCheckInModal] = useState(false);
    const [denyModal, setDenyModal] = useState(false);

    const user = useSelector(selectUser);

    useEffect(() => {
        axios.get(homeUrl + user.id).then(res => {
            axios.get(reservationBeforeUrl + res.data.homeId).then(res => {
                setReservation(res.data);
            });
        });
    }, []);

    const openCheckInModal = id => {
        setCheckInModal(true);
        setReservationId(id);
    };

    const closeCheckInModal = () => {
        setCheckInModal(false);
    };

    const openDenyModal = id => {
        setDenyModal(true);
        setReservationId(id);
    };

    const closeDenyModal = () => {
        setDenyModal(false);
    };

    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    const checkIn = () => {
        axios
            .put(checkInUrl, {
                reservationId: reservationId,
                message: document.getElementById('host_page_modal_input_text').value,
            })
            .then(res => {
                if (res.data.code === 1) {
                    Toast.fire({
                        icon: 'success',
                        title: '?????? ?????? ??????'
                      })

                    closeCheckInModal();
                    setReservation(
                        reservation
                            .slice(
                                0,
                                reservation.findIndex(re => re.id === reservationId),
                            )
                            .concat(
                                reservation.slice(
                                    reservation.findIndex(re => re.id === reservationId) + 1,
                                    reservation.length,
                                ),
                            ),
                    );
                } else {
                    Toast.fire({
                        icon: 'error',
                        title: '????????? ????????? ?????????????????????'
                      })
                }
            });
    };

    const denyReservation = () => {
        if (window.confirm('?????? ????????? ??????????????????????')) {
            axios
                .put(denyUrl, {
                    reservationId: reservationId,
                    message: document.getElementById('guest_reservation_deny_message').value,
                })
                .then(res => {
                    alert(res.data.message);
                    if (res.data.code === 1) {
                        setDenyModal(false);
                        setReservation(
                            reservation
                                .slice(
                                    0,
                                    reservation.findIndex(re => re.id === reservationId),
                                )
                                .concat(
                                    reservation.slice(
                                        reservation.findIndex(re => re.id === reservationId) + 1,
                                        reservation.length,
                                    ),
                                ),
                        );
                    }
                });
        }
    };

    return (
        <>
            <Modal
                className="reservation_modal_container"
                open={checkInModal}
                onClose={closeCheckInModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={'host_page_modal_box'}>
                    <div className="host_page_modal_section">
                        <div className="host_page_modal_title">????????? ????????????</div>
                    </div>
                    <div className="host_page_modal_section">
                        <div className="host_page_modal_text">1. ???????????? ???????????? ??????????????????.</div>
                        <div className="host_page_modal_text">2. ???????????? ????????? ?????? ??????????????????.</div>
                    </div>
                    <div className="host_page_modal_section">
                        <div className="host_page_modal_text">????????? ???????????? ??????</div>
                        <div className="host_page_modal_input_box">
                            <textarea
                                id="host_page_modal_input_text"
                                className="host_page_modal_input"
                                placeholder="200??? ????????? ???????????? ??????"
                            />
                        </div>
                        <div className="host_page_modal_section center">
                            <button className="guest_review_reservation_card_button" onClick={() => checkIn()}>
                                ???????????? ??????
                            </button>
                        </div>
                    </div>
                </Box>
            </Modal>
            <Modal
                className="reservation_modal_container"
                open={denyModal}
                onClose={closeDenyModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={'host_page_modal_box'}>
                    <div className="host_page_modal_section">
                        <div className="host_page_modal_title">?????? ??????</div>
                    </div>
                    <div className="host_page_modal_section">
                        <br />
                        <div className="host_page_modal_text">?????? ?????? ??????</div>
                        <br />
                        <div className="host_page_modal_input_box">
                            <textarea
                                id="guest_reservation_deny_message"
                                className="host_page_modal_input"
                                placeholder="200??? ????????? ???????????? ??????"
                            />
                        </div>
                        <div className="host_page_modal_section center">
                            <button className="guest_review_reservation_card_button" onClick={() => denyReservation()}>
                                ?????? ?????? ??????
                            </button>
                        </div>
                    </div>
                </Box>
            </Modal>
            <div className="container">
                <div className="host_reservation_cards_box">
                    {reservation.map(reservation => (
                        <HostProfile
                            key={reservation.id}
                            guest={reservation.user}
                            home={reservation.home}
                            reservation={reservation}
                            setReservation={setReservation}
                            openCheckInModal={openCheckInModal}
                            openDenyModal={openDenyModal}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default HostReservationList;
