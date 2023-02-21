import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const formatTime = (time) => {
  let hours = Math.floor(time / 3600);
  let minutes;

  minutes = Math.floor(Number(time - hours * 3600) / 60);

  let seconds = Math.floor(time - minutes * 60 - hours * 3600);

  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;
  return hours + ":" + minutes + ":" + seconds;
};

function Countdown({ seconds, finalizarProva }) {
  const { t } = useTranslation();
  const [countdown, setCountdown] = useState(seconds);
  const timerId = useRef();

  useEffect(() => {
    timerId.current = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId.current);
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      clearInterval(timerId.current);
      finalizarProva();
    }
  }, [countdown]);

  return (
    <div>
      {t("tempo")} {formatTime(countdown)}
    </div>
  );
}

export default Countdown;
