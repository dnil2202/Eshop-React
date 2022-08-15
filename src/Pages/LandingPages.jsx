import React from 'react';
import image from '../img/living_room_furniture_eg_blue_tone_wallpaper_80113_1920x1080.jpg';
import chair from '../img/aarnio_originals_ballchair_grey11_1200x.webp'
import Carousel from '../Component/Carousel';

const LandingPage = (props) => {
    return (
        <div className="carousel-inner">
            <img src={image} className="w-100 h-auto" />
            <div className='container'>
            <div className="row w-75 align-items-center ms-5 ">
                <hr className="mt-5" />
                <div className="col-md-7 mt-5">
                    <h2>
                        First featurette heading
                        <span className="text-muted">
                            It'll blow your mind.
                        </span>
                    </h2>
                    <p className="lead">
                        Donec ullamcorper nulla non metus auctor fringilla.
                        Vestibulum id ligula porta felis euismod semper.
                        Praesent commodo cursus magna, vel scelerisque nisl
                        consectetur. Fusce dapibus, tellus ac cursus commodo.
                    </p>
                </div>
                <div className="col-md-5 mt-5">
                    <img
                        className="img-fluid mx-auto"
                        src={chair}
                        style={{ width: 500, height: 400 }}
                    />
                </div>
                <hr className="mt-5" />
                <div className="col-md-5 mt-5">
                    <img
                        className="img-fluid mx-auto"
                        src={chair}
                        style={{ width: 500, height: 400 }}
                    />
                </div>
                <div className="col-md-7 mt-5">
                    <h2>
                        First featurette heading
                        <span className="text-muted">
                            It'll blow your mind.
                        </span>
                    </h2>
                    <p className="lead">
                        Donec ullamcorper nulla non metus auctor fringilla.
                        Vestibulum id ligula porta felis euismod semper.
                        Praesent commodo cursus magna, vel scelerisque nisl
                        consectetur. Fusce dapibus, tellus ac cursus commodo.
                    </p>
                </div>
                <hr className="mt-5" />
                <div className="col-md-7 mt-5">
                    <h2>
                        First featurette heading
                        <span className="text-muted">
                            It'll blow your mind.
                        </span>
                    </h2>
                    <p className="lead">
                        Donec ullamcorper nulla non metus auctor fringilla.
                        Vestibulum id ligula porta felis euismod semper.
                        Praesent commodo cursus magna, vel scelerisque nisl
                        consectetur. Fusce dapibus, tellus ac cursus commodo.
                    </p>
                </div>
                <div className="col-md-5 mt-5">
                    <img
                        className="img-fluid mx-auto"
                        src={chair}
                        style={{ width: 500, height: 400 }}
                    />
                </div>
            </div>
            </div>
        </div>
    );
};

export default LandingPage;
