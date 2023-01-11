import './intro.css';
import Logo from "../../../assets/img/logo.png";

function Intro() {
  return (
    <div className="intro" id='home'>
          <div className='intro-background'></div>
     <div className='intro-left'>
        <div className='intro-left-wrapper'>
          <h1 className='intro-name'>Learn by Doing</h1>
          <h1 className='intro-description'>Any subject Anytime Anywhere Anyone.</h1>
          <h1 className='intro-description'>Lear, Teach Improve your Knowledge about anything.</h1>
          <h1 className='intro-description'>Made by everyone for everyone</h1>
        </div>
     </div>
     <div className='intro-right'/>
      <img src={Logo} alt="" className="logo-icon"/>
    </div>
  );
}

export default Intro;
