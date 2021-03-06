/*global kakao*/
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import idea from '../../images/idea.png';
import DaumPostcode from 'react-daum-postcode';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../_reducers';

function HostingStep1({ test, setTest }) {
    const navigate = useNavigate();

    const catUrl = '/home/v1/home_category/list';
    const [homeCategory, setHomeCategory] = useState([]);
    const [homeName, setHomeName] = useState('');
    const [selectCat, setSelectCat] = useState([]);
    const [address, setAddress] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [isOpenPost, setIsOpenPost] = useState(false);
    const user = useSelector(selectUser);
    const [location, setLocation] = useState({
        coordinateX: 35.22926277844656,
        coordinateY: 129.09024080030179,
    });

    useEffect(() => {
        axios.get(catUrl).then(res => {
            setHomeCategory(res.data);
        });
    }, []);

    useEffect(() => {
        var mapContainer = document.getElementById('map'),
            mapOption = {
                center: new kakao.maps.LatLng(location.coordinateX, location.coordinateY),
                level: 3,
            };
        var map = new kakao.maps.Map(mapContainer, mapOption);
        var marker = new kakao.maps.Marker({
            position: map.getCenter(),
        });
        marker.setMap(map);
        kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
            var latlng = mouseEvent.latLng;
            marker.setPosition(latlng);
            setLocation({
                coordinateX: latlng.getLat(),
                coordinateY: latlng.getLng(),
            });
        });
    }, []);

    const onCompletePost = data => {
        let fullAddr = data.address;
        let extraAddr = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddr += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
        }

        setAddress(fullAddr);
        setZipCode(data.zonecode);
        setIsOpenPost(false);
    };

    const handleCatClick = id => {
        setSelectCat(id);
    };

    const handleClick = () => {
        setTest({
            ...test,
            homeAddress: address + ' ' + document.getElementById('address_detail').value,
            homeZipCode: zipCode,
            homeCategoryId: selectCat,
            homeName: homeName,
            coordinateX: location.coordinateX,
            coordinateY: location.coordinateY,
            userId: user.id,
        });
        navigate('/hosting2');
    };

    const postCodeStyle = {
        display: 'block',
        position: 'relative',
        top: '70%',
        width: '400px',
        height: '500px',
        padding: '7px',
    };

    return (
        <div className="hostingstep1">
            <div className="header_section">
                <p>?????? ?????? step 1</p>
            </div>
            <div className="container">
                <div className="hostingdate__title">
                    <h2> ?????? ?????? ??????</h2>
                </div>
                <div className="hosting_date_container">
                    {homeCategory.map(item => (
                        <Button
                            variant="outlined"
                            key={item.id}
                            id={`category${item.id}`}
                            onClick={() => handleCatClick(item.id)}
                        >
                            {' '}
                            {item.homeCategoryName}
                        </Button>
                    ))}
                </div>
                <div className="hosting_step1-grid">
                    <div className="hosting_container">
                        <div className="hostingdate">
                            <div className="hostingname">
                                <h2> ?????? ?????? ?????? </h2>
                            </div>
                            <div className="hostingname_input">
                                <input
                                    placeholder="?????? ?????? ??????"
                                    onChange={({ target: { value } }) => setHomeName(value)}
                                ></input>
                            </div>
                        </div>
                        <div className="hostinglocation">
                            <div className="address_continer">
                                <h2> ????????? ?????? ?????? ?????? ??????</h2>
                                <input
                                    onClick={() => setIsOpenPost(!isOpenPost)}
                                    id="address"
                                    value={address}
                                    readOnly
                                />
                                {isOpenPost ? (
                                    <DaumPostcode style={postCodeStyle} autoClose onComplete={onCompletePost} />
                                ) : null}
                                <h2> ?????? ??????</h2>
                                <input id="address_detail" />
                                <h2>????????????</h2>
                                <input id="zip_code" value={zipCode} readOnly />
                            </div>
                            <div className="hosting_map">
                                <h2> ?????? ??????</h2>
                                <div id="map" className="map_box"></div>
                            </div>
                        </div>
                    </div>
                    <div className="hostingname_info">
                        <img src={idea} alt="idea.png" />
                        <h4>?????? ????????? ????????? ??????</h4>
                        <h4>
                            ?????? ????????? ?????? ???????????? ???????????? ???????????? ?????????????????? ????????? ????????? ????????? ????????? ?????????.
                            ????????? ?????? ??????????????????. ????????? ?????? ????????? ??????????????????. ?????? ?????? ??????????????? ?????? ??????
                            ????????? ???????????????
                        </h4>
                        <h4 style={{ color: 'red' }}> ???) ?????? ?????? ??????</h4>
                    </div>
                    <div className="hostingstep1_button">
                        <Button style={{ width: '150px' }} variant="container" onClick={handleClick}>
                            ????????????
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HostingStep1;
