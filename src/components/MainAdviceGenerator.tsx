import './style.scss'

import { useEffect, useState } from 'react'

import { dataType } from '../type/dataType'

import axios from 'axios'


const MainAdviceGenerator = () => {
    const [randomNumber, setRandomNumber] = useState<number>(20)
    const [ dados, setDados] = useState<dataType>()

    const [numberAdvice, setNumberAdvice] = useState<number>(117)
    const [advice, setAdvice] = useState<string>("It is easy to sit up and take notice, what's difficult is getting up and taking action.")

    const getAdvice = async() => {
        setRandomNumber(Math.floor(Math.random() * (200 - 1) * 1))
        const url = `https://api.adviceslip.com/advice/${randomNumber}`

        const res = await axios.get(url)
        setDados(res.data)
        
        if(dados?.slip.id){
            setNumberAdvice(dados?.slip?.id!)
        }
        if(dados?.slip.advice){
            setAdvice(dados?.slip?.advice!)
        }
    }

    const handleClickButton = () => {
        getAdvice()
    }

    useEffect( () => {
        getAdvice()
    }, [])
   



    return (
        <main>
            <p className='adviceId'>Advice #{numberAdvice}</p>
            <p className='advice'><q>{advice}</q></p>
            <div className="separator"> </div>
            <button onClick={handleClickButton}>
                <img src="/icon-dice.svg" alt="Random Advice" title='Random Advice' />
            </button>
        </main>
    )
}

export default MainAdviceGenerator