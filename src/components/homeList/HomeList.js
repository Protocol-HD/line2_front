
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './HomeList.css';
import InfoCard from './InfoCard';
import Map from './Map';
import Search from '../main/Search';
import { Pagination } from '@mui/material';
import { useParams } from 'react-router-dom';


function HomeList() {
    // const shelterListUrl = "http://localhost:8080/book/v1/home/find/"
        
    const shelterListUrl = "book/v1/home/find";
    const {location} = useParams();
    const [shelterlist, setShelterlist] = useState([]);
    const [page, setPage] = useState(0);
    const [pageNum, setPageNum] =useState(1);

    useEffect(()=>{
        axios.get(shelterListUrl + location)
        .then(res=>{
            setShelterlist(res.data)
            console.log(res.data)
        })
    },[location])

    const handlePage = (event,value) =>{
        setPageNum(value)
        setPage(value *3 -3)

        console.log(page)

    }

    return (
        <>
        
        <Search/>
    <div className='list-map_container'>
        <div className='home_list'>
            <section className='search_title'>

                <div className='search_buttonGroup' >
                    <p>Cancellation Flexibility</p>
                    <p>Type of Gender</p>
                    <p>Rooms and Beds</p>
                    <p>More filters</p>
                </div>
            </section>
            <section>
            {
                shelterlist && shelterlist.map((shelter) =>{return(
                    <InfoCard key={shelter.homeId} shelter={shelter} homeFacilities={shelter.homeFacilities} />
                )}).slice(page,page+3)
            }
            <Pagination count={10} page={pageNum} onChange={handlePage}/>
            </section>
        </div>
        <section className='map_section'>
                <Map shelterlist={shelterlist}/>
        </section>
    </div>
    </>
  )
}

export default HomeList;
