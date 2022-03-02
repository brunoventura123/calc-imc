
import { useState } from 'react';
import powered from './assets/powered.png'
import styles from './assets/styles.module.css'
import { GridItem } from './components/GridItem';
import leftArrowImage from './assets/leftarrow.png'

import { levels, calculateImc, level } from './helpers/imc'


function App() {
  const [heightField, setHeightField] = useState<number>(0)
  const [weightField, setWeightField] = useState<number>(0)
  const [show, setShow] = useState<string>('')
  const [toShow, setToShow] = useState<level | null>(null)

  let showInfo = document.querySelector('#show') as HTMLDivElement

  const handleCalculateButton = () => {

    if (heightField > 0 && weightField > 0) {
      showInfo.style.display = 'none'
      setToShow(calculateImc(heightField, weightField))

    } else {
      showInfo.style.display = 'flex'
      setShow('Digite todos os campos')
    }

  }
  const handleBackButton = () => {
    setToShow(null)
    setHeightField(0)
    setWeightField(0)
  }

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={powered} width={150} alt="Logo" />
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC.</h1>
          <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>
          <div id='show' className='bg-red-200 text-red-700 p-3 hidden'>{show}</div>
          <input
            type="number"
            placeholder='Digite sua altura. Ex: 1.5 (em métros)'
            value={heightField ? heightField : ''}
            onChange={(e) => setHeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />
          <input
            type="number"
            placeholder='Digite seu peso. Ex: 75.4 (em kg)'
            value={weightField ? weightField : ''}
            onChange={(e) => setWeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />
          <button onClick={handleCalculateButton} disabled={toShow ? true : false}>Calcular</button>
        </div>
        <div className={styles.rightSide}>
          {!toShow &&
            <div className={styles.grid}>
              {levels.map((i, k) => (
                <GridItem key={k} item={i} />
              ))}
            </div>
          }
          {toShow &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrowImage} alt="" width={25} />
              </div>
              <GridItem item={toShow} />
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
