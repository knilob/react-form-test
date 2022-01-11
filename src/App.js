import logo from './ghost.svg';
import './App.css';
import { useEffect } from "react";
import ContactForm from './ContactForm';

function App() {
    useEffect(() => {
        if (document) {
            const stylesheet = document.createElement("link");
            stylesheet.rel = "stylesheet";
            stylesheet.href = "https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css";
            document.head.appendChild(stylesheet);
        }
    }, []);
    return (
        <div className="App">
            <header className="App-header">
                <div className="flex container">
                    <div className="py-6 flex-1">
                        <p>
                            <img src={logo} className="App-logo mx-auto" alt="logo" />
                            Test React Contact Form
                        </p>
                    </div>
                    <div className="py-6 flex-1">
                        <ContactForm />
                    </div>
                </div>
            </header>
        </div>
    );
}

export default App;
