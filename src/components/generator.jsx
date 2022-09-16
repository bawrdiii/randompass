import { useState } from "react"


export const Generator = () => {

    const [num, setNum] = useState('')
    const [result, setResult] = useState('')

    const inpOnChange = (e) => {
        let value = e.target.value
        setNum(value)
    }
    const inpOnclick = () => {
        let spans = document.querySelectorAll("span")
        let input = document.querySelector("#input")
        document.addEventListener('click', (e) => {
            const isClickedInside = input.contains(e.target)
            if (isClickedInside) {
                spans.forEach(item => {
                    item.classList.add("visible")
                })
            }
            else if (!isClickedInside) {
                spans.forEach(item => {
                    item.classList.remove("visible")
                })
            }
        })
    }
    const allCharacter = '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCEDFGHIJKLMNOPQRSTUVWXYZ'
    let res = ''
    const generatorfn = (value) => {
        for (let i = 0; i < value; i++) {
            var randomNum = Math.floor(Math.random() * allCharacter.length)
            res += allCharacter.substring(randomNum, randomNum + 1)
        }
        setResult(res)
    }
    const check = () => {
        if (num !== "" && num < 3) {
            setNum(4)
            generatorfn(4)
        } else if (num !== "" && num > 15) {
            setNum(15)
            generatorfn(15)
        }
        else {
            generatorfn(num)
        }
    }
    const copyPass = () => {
        var copyText = document.querySelector("#generated")
        copyText.select()
        copyText.setSelectionRange(0, 99999)
        document.execCommand("copy")
        var alertP = document.querySelector('#alert')
        if (result !== "") {
            alertP.classList.add("visible")
        }
        setTimeout(() => {
            alertP.classList.remove("visible")
        }, 2000);
    }
    return (
        <main className="main">
            <h3>Generate password between 4 and 15 digit</h3>
            <div className="p-relative w-100">
                <input
                    type="number"
                    className="input"
                    min="4"
                    placeholder="Password length"
                    max="15"
                    value={num}
                    onChange={inpOnChange}
                    onClick={inpOnclick}
                    id="input"
                    pattern="[4-15]*"
                />
                <span className="p-absolute top v-hidden"></span>
                <span className="p-absolute right v-hidden"></span>
            </div>
            <div className="d-flex">
                <button type="button" className="btn" onClick={check}>Generate</button>
            </div>
            <div className="generated w-100 text-center">
                <input
                    readOnly
                    value={result}
                    id="generated"
                    className="input-result"
                    onClick={copyPass}
                    placeholder="Generated text..."
                />
                <p className="alert v-hidden" id="alert">Copied!</p>
            </div>
        </main>
    )
}
