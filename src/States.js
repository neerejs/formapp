import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import * as contentfulManagement from 'contentful-management';
// import { Formik } from 'formik';
import { Formik} from 'formik';

import './FormikForm.css';
import { Col, Row, Container, Alert } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const States = () => {

    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [countryVal, setCountryVal] = useState('');
    //const [stateVal, setStateVal] = useState('');
   



    useEffect(() => {
        getDevices();
    })

    const getDevices = async () => {
        var headers = new Headers();
        headers.append("X-CSCAPI-KEY", "RzJudWc2V1M4N3hDWlBST3RrMVlQQkdlQkhtc3JRNkp4NEgycWs1eA==");

        var requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };


        const fetchResponse = await fetch('https://api.countrystatecity.in/v1/countries', requestOptions);
        const data = await fetchResponse.json();
        setCountries(data)


    }

    const getContents = () => {

        const contentsArray = [];

        countries.forEach((item, ind) => {
            contentsArray.push(
                <>
                    <option value={item.iso2}>{item.name}</option>
                </>
            )
            // console.log('https://api.countrystatecity.in/v1/countries/'+item.iso2+'/states');
        })


        return contentsArray;
    }



    const setContentsState = async (icd) => {
        setCountryVal(icd);
        var headers = new Headers();
        headers.append("X-CSCAPI-KEY", "RzJudWc2V1M4N3hDWlBST3RrMVlQQkdlQkhtc3JRNkp4NEgycWs1eA==");

        var requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        if (icd) {

            const fetchResponse = await fetch('https://api.countrystatecity.in/v1/countries/' + icd + '/states', requestOptions);
            const data = await fetchResponse.json();
            setStates(data)
        }


    }




    const getContentsState = () => {

        const contentsArray = [];

        contentsArray.push(<option>Select Your State</option>)


        states.forEach((item, ind) => {
            contentsArray.push(
                <>
                    <option value={item.iso2}>{item.name}</option>


                </>
            )

        })

        return contentsArray;
    }



    const setContentsCity = async (state) => {
        
        var headers = new Headers();
        headers.append("X-CSCAPI-KEY", "RzJudWc2V1M4N3hDWlBST3RrMVlQQkdlQkhtc3JRNkp4NEgycWs1eA==");

        var requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        if (state && countryVal) {

            const fetchResponse = await fetch('https://api.countrystatecity.in/v1/countries/' + countryVal + '/states/' + state + '/cities', requestOptions);
            const data = await fetchResponse.json();
            setCities(data)
        }
    }


    const getContentsCity = () => {
        const contentsArray = [];
        contentsArray.push(<option>Select Your City</option>)
        cities.forEach((item, ind) => {
            contentsArray.push(
                <>
                    <option value={item.name}>{item.name}</option>
                </>
            )

        })
        return contentsArray;
    }




    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Formik initialValues={{ country: "", state: "", city: "" }}
                            
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                console.log(values)
                                setSubmitting(true);
                                setShow(true);
                                setTimeout(() => {
                                    alert(JSON.stringify(values, null, 2));
                                    alert(values.cars)
                                    const client = contentfulManagement.createClient({
                                        accessToken: 'CFPAT-oUCFauW8e8B0z1etnV5Lx0V0eEegb51Dy4d__550f1k'
                                    })
                                    client.getSpace('nvm4509pk8bp')
                                        .then((space) => space.getEnvironment('master'))
                                        .then((environment) => environment.createEntry('countryStateCity', {
                                            fields: {
                                                country: {
                                                    'en-US': values.country
                                                },
                                                state: {
                                                    'en-US': values.state
                                                },
                                                city: {
                                                    'en-US': values.city
                                                },

                                            }
                                        }))
                                        .then((entry) => {
                                            console.log(entry)
                                            entry.publish()
                                        })
                                        .catch((error) => {
                                        })
                                    resetForm();

                                    setSubmitting(false);
                                }, 500);
                            }}
                        >

                            {({ values, handleChange, handleSubmit, handleBlur, touched, errors, isSubmitting
                            }) => (

                                <Form onSubmit={handleSubmit}>

                                    <Form.Select aria-label="Default select example"

                                        onChange={e => {

                                            handleChange(e)

                                            setContentsState(e.currentTarget.value);

                                        }}

                                        onBlur={handleBlur}
                                        name="country"
                                    >
                                        <option>Select Your Country</option>
                                        {getContents()}
                                    </Form.Select>
                                    {touched.cars && errors.cars ? (
                                        <div className="error-message">{errors.cars}</div>
                                    ) : null}

                                    <Form.Select aria-label="Default select state"
                                        onChange={e => {

                                            handleChange(e)

                                            setContentsCity(e.currentTarget.value);

                                        }}
                                        onBlur={handleBlur}
                                        name="state"
                                    >

                                        {getContentsState()}
                                    </Form.Select>
                                    {touched.state && errors.state ? (
                                        <div className="error-message">{errors.state}</div>
                                    ) : null}

                                    <Form.Select aria-label="Default select city"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="city"
                                    >

                                        {getContentsCity()}
                                    </Form.Select>
                                    {touched.state && errors.state ? (
                                        <div className="error-message">{errors.state}</div>
                                    ) : null}

                                    {show ? <Alert key='success' variant='success' dismissible onClose={() => {
                                        setShow(false)
                                        navigate('/')
                                    }}> Record created successfully  </Alert> : null}
                                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                                        Submit
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default States;