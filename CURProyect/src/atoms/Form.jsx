import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import ReCAPTCHA from "react-google-recaptcha";
import "../assets/style/Button.css";
import "../assets/style/Form.css";

function Form() {
    const [isVerified, setIsVerified] = useState(false);
    const [isCaptchaSolved, setIsCaptchaSolved] = useState(false);
    const [captcha, setCaptcha] = useState('');
    const [userInput, setUserInput] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellidoPaterno, setApellidoPaterno] = useState('');
    const [apellidoMaterno, setApellidoMaterno] = useState('');
    const [dia, setDia] = useState('');
    const [mes, setMes] = useState('');
    const [ano, setAno] = useState('');
    const [sexo, setSexo] = useState('');
    const [estado, setEstado] = useState('');

    const handleCaptchaResponseChange = (response) => {
        if (response) {
            setIsVerified(true);
        }
    };
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

    const handleSubmitAlertDataForm = (event) => {
        event.preventDefault();
        alert(`Nombre: ${nombre}\nApellido Paterno: ${apellidoPaterno}\nApellido Materno: ${apellidoMaterno}\nFecha de Nacimiento: ${dia}/${mes}/${ano}\nSexo: ${sexo}\nEstado: ${estado}`);
    };

    return ( 
        <>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className='form'>
                    <form onSubmit={handleSubmit}>
                        <p className="title">Registrito para CURP </p>
                        {!isCaptchaSolved && (
                            <>
                                <p className='text-center'>{captcha}</p>
                                <input type="text" value={userInput} onChange={handleInputChange} required />
                                <button type="submit">Verificar</button>
                            </>
                        )}
                    </form>
                    <form onSubmit={handleSubmitAlertDataForm}>
                        <ReCAPTCHA sitekey="6LdKP48pAAAAACDznGQr7Uj74R9dcJ85Qi8coIZ8" onChange={handleCaptchaResponseChange}/>
                        <label>
                            <input required="" placeholder="Nombre(s)" type="text" className="input" disabled={!isVerified} onChange={e => setNombre(e.target.value)}/>
                        </label> 
                        <div className="flex">
                            <label>
                                <input required="" placeholder="Apellido Paterno" type="text" className="input" disabled={!isVerified} onChange={e => setApellidoPaterno(e.target.value)}/>
                            </label>
                            <label>
                                <input required="" placeholder="Apellido Materno" type="text" className="input" disabled={!isVerified} onChange={e => setApellidoMaterno(e.target.value)}/>
                            </label>
                        </div>       
                        <p className='text-center'>Fecha De Nacimiento</p>
                        <div className="flex">
                            <label>
                                <input required="" placeholder="Día" type="number" className="input" disabled={!isVerified} onChange={e => setDia(e.target.value)}/>
                            </label>
                            <label>
                                <input required="" placeholder="Mes" type="number" className="input" disabled={!isVerified} onChange={e => setMes(e.target.value)}/>
                            </label>
                            <label>
                                <input required="" placeholder="Año" type="number" className="input" disabled={!isVerified} onChange={e => setAno(e.target.value)}/>
                            </label>
                        </div>    
                        <label>
                            <select className="input" onChange={e => setSexo(e.target.value)}>
                                <option value="">Sexo</option>
                                <option value="hombre">Hombre</option>
                                <option value="mujer">Mujer</option>
                            </select>
                        </label>
                        <label>
                            <select className="input" onChange={e => setEstado(e.target.value)}>
                                <option value="">Selecciona un estado</option>
                                <option value="Chiapas">Chiapas</option>
                                <option value="Zacatecas">Zacatecas</option>
                            </select>
                        </label>
                        <div>
                            <div className="d-flex justify-content-center">
                                <button className="btn mt-5" disabled={!isVerified}><i className="animation"></i>Generar CURP<i className="animation"></i></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
     );
}

export default Form;


{/*
 <option value="Aguascalientes">Aguascalientes</option>
<option value="Baja California">Baja California</option>
<option value="Baja California Sur">Baja California Sur</option>
<option value="Campeche">Campeche</option>
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
*/}