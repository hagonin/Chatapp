import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.scss';
import { imgs } from '@utils/constants';
import Button from '@components/Common/Button';

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="home-wrapper">
      <div className="home container">
        <div className="home-content">
          <h1>Enjoy the new experience of chatting with global friend</h1>
          <span className="home-content__subtitle">
            Connect people around the world for free
          </span>
          <Button
            typeClass="button--primary"
            onClick={() => navigate('/register')}
          >
            Get Started
          </Button>
          <span className="home-content__already">
            Already have an account ?{' '}
            <button onClick={() => navigate('/login')}>Login</button>
          </span>
        </div>

        <div className="home-photos-wrapper">
          <div className="home-photos">
            <div className="home-photos__item">
              <div className="home__photo home__photo--left">
                <img src={imgs.photo1} alt="photo" />
              </div>
            </div>
            <div className="home-photos__item">
              <div className="home__photo">
                <img src={imgs.photo2} alt="photo" />
              </div>
            </div>
            <div className="home-photos__item">
              <div className="home__photo">
                <img src={imgs.photo3} alt="photo" />
              </div>
            </div>
            <div className="home-photos__item">
              <div className="home__photo home__photo--right">
                <img src={imgs.photo4} alt="photo" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
