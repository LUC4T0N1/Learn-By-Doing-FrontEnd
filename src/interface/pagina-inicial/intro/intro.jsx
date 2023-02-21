import { useTranslation } from "react-i18next";
import Logo from "../../../assets/img/logo.png";
import "./intro.css";

function Intro() {
  const { t } = useTranslation();
  return (
    <div className="intro" id="home">
      <div className="intro-background"></div>
      <div className="intro-left">
        <div className="intro-left-wrapper">
          <h1 className="intro-name">Learn by Doing</h1>
          <h1 className="intro-description">{t("intro-description-1")}</h1>
          <h1 className="intro-description">{t("intro-description-2")}</h1>
          <h1 className="intro-description">{t("intro-description-3")}</h1>
        </div>
      </div>
      <div className="intro-right" />
      <img src={Logo} alt="" className="logo-icon" />
    </div>
  );
}

export default Intro;
