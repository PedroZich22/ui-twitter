import { FormEvent, useState, KeyboardEvent } from "react"
import { Header } from "../components/Header"
import { Separator } from "../components/Separator"
import { Tweet } from "../components/Tweet"

import './Status.css'
import { PaperPlaneRight } from "phosphor-react"

/**
 * Fluxo de Renderização:
 * 
 * 1. Toda vez que alterarmos o estado de um componente, TODO o componente é recalculado;
 * 2. Toda vez que o seu componete PAI renderizar;
 * 3. Toda vez que alguma das suas propriedades mudarem.
 */

/**
 * Algoritmo de Reconciliação:
 * 
 * 1. Criar em memóia a nova versão do HTML do componente;
 * 1. Compara essa nova versão com a versão anterior do HTML (Diff)
 * 3. Aplicar as operações necessárias para modificar somente o necessário no HTML.
 */

export function Status() {
  const [newAnswer, setNewAnswer] = useState('')
  const [answers, setAnswers] = useState([
    "Concordo...",
    "Olha, faz sentido!",
    "Parabéns pelo progresso",
  ])

  function createNewAnswer(event: FormEvent) {
    event.preventDefault()

    setAnswers([newAnswer, ...answers])
    setNewAnswer('')
  }

  function handleHotKeySubmit(event: KeyboardEvent) {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      setAnswers([newAnswer, ...answers])
      setNewAnswer('')
    }
  }

  return (
    <main className="status">
      <Header title="Tweet"/>
    
      <Tweet content="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam quos assumenda dolorum facilis aperiam perspiciatis ipsum! Consequatur, dolore quibusdam. Adipisci sunt blanditiis temporibus fuga animi soluta impedit magni placeat obcaecati." />

      <Separator />

      <form onSubmit={createNewAnswer} className="answer-tweet-form">
        <label htmlFor="tweet">
          <img src="https://pbs.twimg.com/profile_images/1325095451775950848/vemuhE7B_400x400.jpg" alt="Pedro Zich" />
          <textarea 
            id="tweet" 
            placeholder="Tweet your answer"
            value={newAnswer}
            onKeyDown={handleHotKeySubmit}
            onChange={(event) => {
              setNewAnswer(event.target.value)
            }}
          />
        </label>

        <button type="submit">
          <PaperPlaneRight />
          <span>Answer</span>
        </button>
      </form>

      {answers.map(answer => {
        return <Tweet key={answer} content={answer} />
      })}
    </main>
  )
}