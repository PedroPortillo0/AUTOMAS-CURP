import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import ReCAPTCHA from "react-google-recaptcha";
import "../assets/style/Form.css";

function Form() {
    const [isVerified, setIsVerified] = useState(false);
    const [isCaptchaSolved, setIsCaptchaSolved] = useState(false);

    const handleCaptchaResponseChange = (response) => {
        if (response) {
            setIsVerified(true);
        }
    };

    const [captcha, setCaptcha] = useState('');
    const [userInput, setUserInput] = useState('');

    useEffect(() => {
        generateCaptcha();
    }, []);

    const generateCaptcha = () => {
        let randomString = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        for (let i = 0; i < 5; i++) {
            randomString += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setCaptcha(randomString);
    };

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (userInput !== captcha) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El captcha ingresado no coincide!',
            });
            generateCaptcha();
            setUserInput('');
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Bien hecho!',
                text: 'El captcha ingresado coincide.',
            });
            setIsCaptchaSolved(true);
            setUserInput('');
        }
    };

    return ( 
        <>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <form className="form" onSubmit={handleSubmit}>
                    <p className="title">Registrito para CURP </p>
                    <p className="message">Corte 3 Automatas </p>
                    {!isCaptchaSolved && (
                        <>
                            <p>{captcha}</p>
                            <input type="text" value={userInput} onChange={handleInputChange} required />
                            <button type="submit">Verificar</button>
                        </>
                    )}
                    <ReCAPTCHA sitekey="6LdKP48pAAAAACDznGQr7Uj74R9dcJ85Qi8coIZ8" onChange={handleCaptchaResponseChange}/>
                    <label>
                        <input required="" placeholder="Nombre(s)" type="text" className="input" disabled={!isVerified}/>
                    </label> 
                    <div className="flex">
                        <label>
                            <input required="" placeholder="Apellido Paterno" type="text" className="input" disabled={!isVerified}/>
                        </label>
                        <label>
                            <input required="" placeholder="Apellido Materno" type="text" className="input" disabled={!isVerified}/>
                        </label>
                    </div>       
                    <label>
                        <input required="" placeholder="Fecha De Nacimiento" type="date" className="input" disabled={!isVerified}/>
                    </label> 
                    <label>
                        <select className="input">
                            <option value="">Sexo</option>
                            <option value="hombre">Hombre</option>
                            <option value="mujer">Mujer</option>
                        </select>
                    </label>
                    <label>
                        <select className="input">
                            <option value="">Selecciona un estado</option>
                            <option value="Aguascalientes">Aguascalientes</option>
                            <option value="Baja California">Baja California</option>
                            <option value="Baja California Sur">Baja California Sur</option>
                            <option value="Campeche">Campeche</option>
                            <option value="Chiapas">Chiapas</option>
                            <option value="Chihuahua">Chihuahua</option>
                            <option value="Coahuila">Coahuila</option>
                            <option value="Colima">Colima</option>
                            <option value="Durango">Durango</option>
                            <option value="Estado de México">Estado de México</option>
                            <option value="Guanajuato">Guanajuato</option>
                            <option value="Guerrero">Guerrero</option>
                            <option value="Hidalgo">Hidalgo</option>
                            <option value="Jalisco">Jalisco</option>
                            <option value="Michoacán">Michoacán</option>
                            <option value="Morelos">Morelos</option>
                            <option value="Nayarit">Nayarit</option>
                            <option value="Nuevo León">Nuevo León</option>
                            <option value="Oaxaca">Oaxaca</option>
                            <option value="Puebla">Puebla</option>
                            <option value="Querétaro">Querétaro</option>
                            <option value="Quintana Roo">Quintana Roo</option>
                            <option value="San Luis Potosí">San Luis Potosí</option>
                            <option value="Sinaloa">Sinaloa</option>
                            <option value="Sonora">Sonora</option>
                            <option value="Tabasco">Tabasco</option>
                            <option value="Tamaulipas">Tamaulipas</option>
                            <option value="Tlaxcala">Tlaxcala</option>
                            <option value="Veracruz">Veracruz</option>
                            <option value="Yucatán">Yucatán</option>
                            <option value="Zacatecas">Zacatecas</option>
                        </select>
                    </label>
                    <button className="submit" disabled={!isVerified}>Generar CURP</button>
                </form>
            </div>
        </>
     );
}

export default Form;

