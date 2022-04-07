import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import SmallCard from './SmallCard';
import LargeCard from './LargeCard';
import Search from './Search';
import axios from 'axios';

function Main({ exploreData, cardsData }) {
    const smallcardUrl = '/home/v1/home/list';
    const [smallCard, setSmallCard] = useState([]);

    useEffect(() => {
        axios.get(smallcardUrl).then(res => {
            setSmallCard(res.data);
            console.log(smallCard);
        });
    }, []);

    return (
        <div>
            <Search />
            <Banner />
            <div className="small_card_text">
                <h2>숙소 바로 예약</h2>
            </div>
            <div className="small_card">
                {smallCard && smallCard
                    .map(item => (
                        <SmallCard
                            key={item.homeId}
                            id={item.homeId}
                            image={item.image}
                            homeName={item.homeName}
                            shelter_location={item.shelter_location}
                        />
                    ))
                    .slice(0, 4)}
            </div>
            <div className="large_card">
                <LargeCard img="https://links.papareact.com/4cj" title="" description="안심 서비스 이념" />
            </div>
        </div>
    );
}

export default Main;
