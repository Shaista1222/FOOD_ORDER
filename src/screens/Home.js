import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Menu from '../components/Menu'
import img from '../video/Blue and Green Polaroid Food Photographer Promotion Trifold Brochure.png'

const Home = () => {

    const [menu, setMenu] = useState([])
    const [foodCat, setfoodCat] = useState([])
    const [search, setsearch] = useState("")

    const loatData = async () => {
        let response = await fetch("http://localhost:5000/api/food-data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        response = await response.json()
        //at index[0] menu, is available, at index[1] foodCat 
        // console.log(response[0], response[1])
        setMenu(response[0])
        setfoodCat(response[1])
    }

    useEffect(() => {
        loatData()
    }, [])
    return (
        <div >
            <div> <Header /> </div>
            <div>
                <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel" style={{ objectFit: "contain" }}>

                    <div className="carousel-inner" id='carousel'>
                        <div className="carousel-caption" style={{ zIndex: '10' }}>
                            <nav className="navbar bg-body-tertiary">
                                <div className="container-fluid">
                                    <form className="d-flex justify-content-center" style={{ width: "82rem" }} >
                                        <input className="form-control me-2" style={{ padding: "0.5rem", fontSize: "1.3rem" }} type="search" placeholder="Search to Food" aria-label="Search" value={search} onChange={(e) => { setsearch(e.target.value) }} />
                                        {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
                                    </form>
                                </div>
                            </nav>
                        </div>
                        <div className="carousel-item active"  >
                            <img src={img} className="d-block w-100 " alt="..." />
                        </div>
                    </div>
                </div>
            </div>
            <div className='container text-center'>

                <div>
                    {
                        foodCat !== []
                            ? foodCat && foodCat.map((data) => {
                                return (<div className='row mob-3'>
                                    <div key={data._id} className='fs-3 m-3'>
                                        {data.CategoryName}
                                    </div>
                                    <hr />
                                    {menu !== [] ?
                                        menu.filter((item) => item.CategoryName === data.CategoryName
                                            && item.name.toLowerCase().includes(search.toLowerCase())
                                        )
                                            .map(filterItems => {
                                                return (
                                                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                                        {/* <Menu
                                                            foodName={filterItems.name}
                                                            foodDes={filterItems.description}
                                                            foodImg={filterItems.img}
                                                            option={filterItems.options[0]}
                                                        /> */}
                                                        {/* ek bar m hi sara data bhejna  */}
                                                        <Menu
                                                            foodItem={filterItems}
                                                            option={filterItems.options[0]}
                                                        />
                                                    </div>
                                                )
                                            })
                                        : <div>No data found!</div>}
                                </div>
                                )
                            }) :
                            <div>""</div>
                    }

                </div>
                <div> <Footer /></div>
            </div>

        </div>
    )
}

export default Home