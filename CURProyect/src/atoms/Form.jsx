import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import ReCAPTCHA from "react-google-recaptcha";
import "../assets/style/Button.css";
import "../assets/style/Form.css";

function Form() {
    const [formData, setFormData] = useState([]);
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
        const characters = '6LcntpApAAAAAABa5Ndio61PfktpRp_ajCpddq2b';
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

    const removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    
    const generateCURP = () => {
        const vowels = 'AEIOU';
        const consonants = 'BCDFGHJKLMNPQRSTVWXYZ';
        let curp = removeAccents(apellidoPaterno[0] + (Array.from(apellidoPaterno.slice(1)).find(c => vowels.includes(c.toUpperCase())) || ''));
        curp += removeAccents(apellidoMaterno[0] + nombre[0]);
        curp += ano.slice(2) + (mes.length === 1 ? '0' + mes : mes) + (dia.length === 1 ? '0' + dia : dia);
        curp += sexo[0].toUpperCase();
        curp += estado ? estado.slice(0, 2).toUpperCase() : '';
        curp += removeAccents((Array.from(apellidoPaterno.slice(1)).find(c => consonants.includes(c.toUpperCase())) || ''));
        curp += removeAccents((Array.from(apellidoMaterno.slice(1)).find(c => consonants.includes(c.toUpperCase())) || ''));
        curp += removeAccents((Array.from(nombre.slice(1)).find(c => consonants.includes(c.toUpperCase())) || ''));
        return curp.toUpperCase();
    };

    const handleSubmitAlertDataForm = (event) => {
        event.preventDefault();
        const curp = generateCURP();
        // Agregar los datos del formulario al estado en lugar de mostrar una alerta
        setFormData([...formData, { curp, nombre, apellidoPaterno, apellidoMaterno, dia, mes, ano, sexo, estado }]);
        Swal.fire({
            title: 'Enviado!',
            text: 'Tu formulario ha sido enviado.',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    };
    const handleDayChange = (e) => {
        const day = e.target.value;
        if (day < 1 || day > 31) {
            Swal.fire('Error', 'Day must be between 1 and 31', 'error');
            return;
        }
        if (mes === 2 && day > 29) {
            Swal.fire('Error', "February can't have more than 29 days", 'error');
            return;
        }
        if ([4, 6, 9, 11].includes(mes) && day > 30) {
            Swal.fire('Error', "This month can't have more than 30 days", 'error');
            return;
        }
        setDia(day);
    };

    const handleMonthChange = (e) => {
        const month = e.target.value;
        if (month < 1 || month > 12) {
            Swal.fire('Error', 'Month must be between 1 and 12', 'error');
            return;
        }
        setMes(month);
    };

    const handleYearChange = (e) => {
        const year = e.target.value;
        if (year > 2024) {
            Swal.fire('Error', "Year can't be greater than 2024", 'error');
            return;
        }
        setAno(year);
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
                            <input required="" placeholder="Nombre(s)" type="text" className="input mt-2 mb-2" disabled={!isVerified} onChange={e => setNombre(e.target.value)}/>
                        </label> 
                        <div className="flex">
                            <label>
                                <input required="" placeholder="Apellido Paterno" type="text" className="input mt-2 mb-2" disabled={!isVerified} onChange={e => setApellidoPaterno(e.target.value)}/>
                            </label>
                            <label>
                                <input required="" placeholder="Apellido Materno" type="text" className="input mt-2 mb-2" disabled={!isVerified} onChange={e => setApellidoMaterno(e.target.value)}/>
                            </label>
                        </div>       
                        <p className='text-center'>Fecha De Nacimiento</p>
                        <div className="flex">
                            <label>
                                <input required="" placeholder="Día" type="number" className="input mt-2 mb-2" disabled={!isVerified} onChange={handleDayChange}/>
                            </label>
                            <label>
                                <input required="" placeholder="Mes" type="number" className="input mt-2 mb-2" disabled={!isVerified} onChange={handleMonthChange}/>
                            </label>
                            <label>
                                <input required="" placeholder="Año" type="number" className="input mt-2 mb-2" disabled={!isVerified} onChange={handleYearChange}/>
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
                                <option value="CS">Chiapas</option>
                                <option value="AS">Aguascalientes</option>
                                <option value="BC">Baja California</option>
                                <option value="BS">Baja California Sur</option>
                                <option value="CC">Campeche</option>
                                <option value="CH">Chihuahua</option>
                                <option value="CL">Coahuila</option>
                                <option value="CM">Colima</option>
                                <option value="DG">Durango</option>
                                <option value="DF">Distrito Federal</option>
                                <option value="GT">Guanajuato</option>
                                <option value="GR">Guerrero</option>
                                <option value="HG">Hidalgo</option>
                                <option value="JC">Jalisco</option>
                                <option value="MN">Michoacán</option>
                                <option value="MS">Morelos</option>
                                <option value="MC">México</option>
                                <option value="NT">Nayarit</option>
                                <option value="NL">Nuevo León</option>
                                <option value="OC">Oaxaca</option>
                                <option value="PL">Puebla</option>
                                <option value="QT">Querétaro</option>
                                <option value="QR">Quintana Roo</option>
                                <option value="SP">San Luis Potosí</option>
                                <option value="SL">Sinaloa</option>
                                <option value="SR">Sonora</option>
                                <option value="TC">Tabasco</option>
                                <option value="TS">Tamaulipas</option>
                                <option value="TL">Tlaxcala</option>
                                <option value="VZ">Veracruz</option>
                                <option value="YN">Yucatán</option>
                                <option value="ZS">Zacatecas</option>
                            </select>
                        </label>
                        <div>
                            <div className="d-flex justify-content-center">
                                <button className="btn mt-5" disabled={!isVerified} onClick={handleSubmitAlertDataForm}><i className="animation"></i>Generar CURP<i className="animation"></i></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <table className="centered-table">
                <thead>
                    <tr>
                        <th>CURP</th>
                        <th>Nombre</th>
                        <th>Apellido Paterno</th>
                        <th>Apellido Materno</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Sexo</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {formData.map((data, index) => (
                        <tr key={index}>
                            <td>{data.curp}</td>
                            <td>{data.nombre}</td>
                            <td>{data.apellidoPaterno}</td>
                            <td>{data.apellidoMaterno}</td>
                            <td>{`${data.dia}/${data.mes}/${data.ano}`}</td>
                            <td>{data.sexo}</td>
                            <td>{data.estado}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
     );
}

export default Form;




