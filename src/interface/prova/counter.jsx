
import React from 'react'
import { useState, useEffect } from 'react';
import { realizarProva, setRealizarProva } from '../../application/provaSlice';
import { useSelector, useDispatch } from "react-redux";

const Counter = (props) => {
    const dispatch = useDispatch();
  const prova = useSelector((state) => state.provas.realizarProva);
  const finalizarProva = (e) => {
    dispatch(realizarProva({ ...prova})) 
    dispatch(setRealizarProva({ realizarProva: {nome: "", publica: true, conteudos: [],
    nomeConteudos: [], questoes:[], idsQuestoes:[],
    quantidadeQuestoes: 0, tempo: 0, questoesRespondidasDto:[]}})); 
  }
    const {initialHour = 0, initialMinute = 0,initialSeconds = 0} = props;
    const [ hours, setHours ] = useState(initialHour);
    const [ minutes, setMinutes ] = useState(initialMinute);
    const [seconds, setSeconds ] =  useState(initialSeconds);
    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    setHours(hours-1)      
                    if(hours  ===  0){
                        finalizarProva()
                    }else{
                      setMinutes(59);
                      setSeconds(59);
                    }
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });

    return (
        <div>
        { minutes === 0 && seconds === 0
            ? null
            : <h3> Tempo restante: {hours < 10 ?  `0${hours}` : hours}:{minutes < 10 ?  `0${minutes}` : minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h3> 
        }
        </div>
    )
}

export default Counter;