import React, { useState, useEffect } from 'react';
import HostCheckOutCard from './HostCheckOutCard';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../_reducers';
import { Box, Modal } from '@mui/material';
import Swal from 'sweetalert2';
import zIndex from '@mui/material/styles/zIndex';

function HostCheckOut() {
    const checkOutHostUrl = '/book/v1/reservation/home/after_check_out/';
    const checkOutUrl = '/book/v1/reservation/accept_check_out';
    const homeUrl = '/home/v1/home/user/';

    const [reservation, setReservation] = useState([]);
    const [modalState, setModalState] = useState(false);
    const [reservationId, setReservationId] = useState(0);

    const user = useSelector(selectUser);

    useEffect(() => {
        axios.get(homeUrl + user.id).then(res => {
            axios.get(checkOutHostUrl + res.data.homeId).then(res => {
                setReservation(res.data);
            });
        });
    }, []);

    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        zIndex:1000,
        didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    const openModal = id => {
        setModalState(true);
        setReservationId(id);
    };

    const closeModal = () => {
        setModalState(false);
    };

    const checkIn = () => {
        let reservationTmp = {
            ...reservation.find(res => res.id === reservationId),
            checkOutMessage: document.getElementById('host_page_modal_input_text').value,
        };
        axios
            .put(checkOutUrl, {
                reservationId: reservationId,
                message: document.getElementById('host_page_modal_input_text').value,
            })
            .then(res => {
                if (res.data.code === 1) {
                    Toast.fire({
                        icon: 'success',
                        title: '?????? ??????'
                      })
                    closeModal();
                    setReservation(
                        reservation
                            .slice(
                                0,
                                reservation.findIndex(re => re.id === reservationId),
                            )
                            .concat([reservationTmp])
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
                        title: '????????? ????????? ?????????????????????.'
                      })
                }
            });
    };

    return (
        <>
            <Modal
                className="reservation_modal_container"
                open={modalState}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={'host_page_modal_box'}>
                    <div className="host_page_modal_section">
                        <div className="host_page_modal_title">???????????? ??????</div>
                    </div>
                    <div className="host_page_modal_section">
                        <br />
                        <div className="host_page_modal_text">?????? ???????????? ??????</div>
                        <br />
                        <div className="host_page_modal_input_box">
                            <textarea
                                id="host_page_modal_input_text"
                                className="host_page_modal_input"
                                placeholder="200??? ????????? ???????????? ??????"
                            />
                        </div>
                        <div className="host_page_modal_section center">
                            <button className="guest_review_reservation_card_button" onClick={() => checkIn()}>
                                ?????? ??????
                            </button>
                        </div>
                    </div>
                </Box>
            </Modal>
            <div className="container">
                <div className="host_reservation_cards_box">
                    {reservation.map(reservation => (
                        <HostCheckOutCard
                            key={reservation.id}
                            guest={reservation.user}
                            home={reservation.home}
                            reservation={reservation}
                            openModal={openModal}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default HostCheckOut;
