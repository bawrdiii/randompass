import { useEffect, useState } from "react"


export const Checker = () => {
    const [text, setText] = useState("")
    const [down, setDown] = useState(true)
    const [range, setRange] = useState(0)

    const clickHandler = () => {
        const uls = document.querySelector("#ul-hint")
        const section = document.querySelector("#main-hint")
        const height = document.querySelector("#hint")

        if (down) {
            setDown(false)
            uls.classList.add("ul-hint-after")
            section.style.height = `190px`
            height.style.height = `unset`
        }
        else {
            setDown(true)
            uls.classList.remove("ul-hint-after")
            section.style.height = `30px`
            height.style.height = `100%`
        }

    }

    const generalCheck = e => {
        setText(e.target.value)
    }

    useEffect(() => {

        if (text !== '') {
            document.querySelector("#strength").classList.add("visible")
        }

        var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/

        const progress = document.querySelector("#range")

        var charLength = text.length

        if (charLength < 4) {
            setRange(0)
        }
        else if (charLength >= 4 && charLength <= 5) {
            setRange(1)
            progress.classList.add("weak")
            progress.classList.remove("mid")
            progress.classList.remove("mid-after")
            progress.classList.remove("strong")
        }
        else if (charLength >= 6 && charLength <= 9) {
            document.querySelector("#length").classList.add("li-after")

            progress.classList.remove("weak")
            progress.classList.remove("mid-after")
            progress.classList.remove("strong")
            progress.classList.add("mid")
            setRange(2)
        }
        else if (charLength >= 10) {
            if (
                format.test(text)
                && /[A-Z]+/.test(text)
                && /\d/.test(text)
            ) {
                setRange(4)
                progress.classList.remove("weak")
                progress.classList.remove("mid")
                progress.classList.remove("mid-after")
                progress.classList.add("strong")
            }
            else {
                setRange(3)
                progress.classList.remove("weak")
                progress.classList.remove("mid")
                progress.classList.add("mid-after")
                progress.classList.remove("strong")

            }
        }


        if (/\d/.test(text)) {
            document.querySelector("#number").classList.add("li-after")
        }
        else {
            document.querySelector("#number").classList.remove("li-after")
        }
        if (/[A-Z]+/.test(text)) {
            document.querySelector("#upper").classList.add("li-after")
        }
        else {
            document.querySelector("#upper").classList.remove("li-after")
        }
        if (format.test(text)) {
            document.querySelector("#special").classList.add("li-after")
        } else {
            document.querySelector("#special").classList.remove("li-after")
        }
        if (charLength < 6) {
            document.querySelector("#length").classList.remove("li-after")
        }


        document.addEventListener("click", (e) => {
            const uls = document.querySelector("#ul-hint")
            const section = document.querySelector("#main-hint")
            const height = document.querySelector("#hint")
            const strength = document.querySelector("#checker")
            const generated = document.querySelector("#generated")
            const firstInput = document.querySelector("#input")
            const button = document.querySelector("#button")
            const clickedInsideSection = section.contains(e.target)
            const clickedInsideStrength = strength.contains(e.target)
            const clickedInsideSecondInput = generated.contains(e.target)
            const clickedInsideButton = button.contains(e.target)
            console.log(clickedInsideSecondInput);
            const clickedInsideFirstInput = firstInput.contains(e.target)
            if (!clickedInsideSection &&
                !clickedInsideStrength
                && !clickedInsideSecondInput
                && !clickedInsideFirstInput
                && !clickedInsideButton
            ) {
                setDown(true)
                uls.classList.remove("ul-hint-after")
                section.style.height = `30px`
                height.style.height = `100%`
            }
        })
    }, [text])
    return (
        <section className="main">
            <label htmlFor="checker" className="check-label">
                <h3 className="text-center">Check password strength </h3>
            </label>
            <section className="w-100">
                <input
                    id="checker"
                    type="text"
                    name="password"
                    className="input"
                    value={text}
                    onChange={generalCheck}
                />
            </section>
            <section className="v-hidden text-center" id="strength">
                <progress
                    className="range"
                    max="4"
                    readOnly
                    value={range}
                    id="range"
                ></progress>
                <section className="bg-hint" id="main-hint">
                    <section className="hint" id="hint" onClick={clickHandler}>
                        <p className="hint-p" >How to have strength pass?</p>
                        <p className="arrow">
                            {down ? `▼` : `▲`}
                        </p>
                    </section>
                    <ul className="ul-hint" id="ul-hint">
                        <li id="length">At least 6-10 length</li>
                        <li id="upper">At least one uppercase letter</li>
                        <li id="special">At least one special character</li>
                        <li id="number">At least one number</li>
                    </ul>
                </section>
            </section>
        </section>
    )
}
