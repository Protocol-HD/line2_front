import React, { useState } from "react";
import "./HostReservation.css";
import { Tab, Tabs } from "@mui/material";
import HostReservationList from "./HostReservationList";
import HostCheckInCard from "./HostCheckInCard";
import HostCheckOutCard from "./HostCheckOutCard";

function HostReservation() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };


    return (
        <div className="host_reservation_body">
            <Tabs
                        className='tabs'
                        value={value}
                        onChange={handleChange}
                    >
                        <Tab style={{fontSize : '20px', color : 'blue'}} label="예약목록" />
                        <Tab style={{fontSize : '20px', color : 'blue'}} label="체크인" />
                        <Tab style={{fontSize : '20px', color : 'blue'}} label="체크아웃" />
                    </Tabs>

                    {value === 0 && <HostReservationList /> }
                    {value === 1 && <HostCheckInCard /> }
                    {value === 2 && <HostCheckOutCard /> }
        </div>
    );
}

export default HostReservation;