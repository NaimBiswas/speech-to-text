import { useEffect, useRef, useState } from 'react';

const useSpeechToText = (options) => {

    const [isListening, setIsListening] = useState(false)
    const [storeOldText, setStoreOldText] = useState("")
    const [transcript, setTranscript] = useState("")
    const recognitionRef = useRef(null)


    useEffect(() => {
        if (!("webkitSpeechRecognition" in window)) {
            console.error("Web Speech api is not supported by the browser")
            alert("You browser doesn't support web speech kindly update your browser to latest version or switch to the latest version for chrome/firefox")
            return
        }

        recognitionRef.current = new window.webkitSpeechRecognition()
        const recognition = recognitionRef.current

        recognition.interimResults = options.interimResults || true
        recognition.lang = options.interimResults || "en-US"
        recognition.continues = options.continuous || false
        recognition.text = options.text || ''
        recognition.volume = 1
        recognition.rate = 1
        recognition.pitch = 1
        recognition.continuous = true;

        if ("webkitSpeechGrammarList" in window) {
            const grammar = "#JSGF V1.0; grammar punctuation; public <punc> = . | , | ? | ! | ; | : ;"
            const speechRecognitionList = new window.webkitSpeechGrammarList()

            speechRecognitionList.addFromString(grammar, 1)

            recognition.grammars = speechRecognitionList
        }

        recognition.onresult = (e) => {
            let text = ""
            if (e && e.results) {

                for (let i = 0; i < e.results.length; i++) {
                    text += e.results[i][0].transcript

                }
                console.log(text);

                setTranscript(text + '')
            }
        }

        recognition.onerror = (e) => {
            alert("Speech recognition error")
            console.error(e?.error)
        }

        recognition.onend = () => {
            if (isListening) {
                recognition.start();
            }
        }

        if (!isListening) {
            recognition.stop();
        }
        return () => {
            recognition.stop()
        }
    }, [])

    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            recognitionRef.current.start()
            setTranscript("")
            setIsListening(true)
        }
    }

    const stoptListening = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop()
            setIsListening(false)
            setStoreOldText((pre) => pre + " " + transcript)
            // setTranscript("")
        }
    }


    return {
        isListening,
        transcript,
        storeOldText,
        startListening,
        stoptListening
    }
}

export default useSpeechToText;
