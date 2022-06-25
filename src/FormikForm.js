import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import * as contentfulManagement from 'contentful-management';
// import { Formik } from 'formik';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import './FormikForm.css';
import { Col, Row, Container, Alert } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const FormikForm = () => {

    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const [states, setState] = useState([]);
    

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
        setState(data)


    }

    const getContents = () => {

        const contentsArray = [];

        states.forEach((item, ind) => {
            contentsArray.push(
                <>
                    <option value={item.name}>{item.name}</option>
                    

                </>
            )
            console.log('https://api.countrystatecity.in/v1/countries/'+item.iso2+'/states');
        })
        
        return contentsArray;
    }

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const validationSchema = Yup.object().shape({

        name: Yup.string()
            .min(2, "*Names must have at least 2 characters")
            .max(100, "*Names can't be longer than 100 characters")
            .required("*Name is required"),
        email: Yup.string()
            .email("*Must be a valid email address")
            .max(100, "*Email must be less than 100 characters")
            .required("*Email is required"),
        address: Yup.string()
            .min(2, "*Names must have at least 2 characters")
            .max(100, "*Names can't be longer than 100 characters")
            .required("*Name is required"),
        checked: Yup.array().min(1),
        radios: Yup.string().oneOf(["Green", "Red", "Blue"]).required(),
        cars: Yup.string().required("*Car model  is required"),
        phone: Yup.string().matches(phoneRegExp).required('Phone number is not valid'),
        zip: Yup.string()
            .required("*Zip Code is Required")
            .min(5, 'Must be exactly 5 digits')
            .max(5, 'Must be exactly 5 digits')
    });

    return (


        <>
            <Container>
                <Row>
                    <Col>
                        <Formik initialValues={{ name: "", email: "", address: "", checked: [], radios: '', cars: '', phone: '', zip: '' }}
                            validationSchema={validationSchema}
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                console.log(values)
                                setSubmitting(true);
                                setShow(true);



                                setTimeout(() => {
                                    alert(JSON.stringify(values, null, 2));


                                    const client = contentfulManagement.createClient({
                                        accessToken: 'CFPAT-oUCFauW8e8B0z1etnV5Lx0V0eEegb51Dy4d__550f1k'
                                    })


                                    client.getSpace('nvm4509pk8bp')
                                        .then((space) => space.getEnvironment('master'))
                                        .then((environment) => environment.createEntry('giveaway', {
                                            fields: {
                                                name: {
                                                    'en-US': values.name
                                                },
                                                email: {
                                                    'en-US': values.email
                                                },
                                                address: {
                                                    'en-US': values.cars
                                                },
                                                lastname: {
                                                    'en-US': values.lastname
                                                },
                                                comments: {
                                                    'en-US': values.comments
                                                },
                                                checked: {
                                                    'en-US': values.checked.toString()
                                                },
                                                radios: {
                                                    'en-US': values.radios
                                                },
                                                cars: {
                                                    'en-US': values.cars
                                                },
                                                phone: {
                                                    'en-US': values.phone
                                                },
                                                zip: {
                                                    'en-US': values.zip
                                                }

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


                                // setSubmiting(true);



                            }}
                        >

                            {({ values, handleChange, handleSubmit, handleBlur, touched, errors, isSubmitting
                            }) => (



                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="formName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Name"
                                            name="name"
                                            onChange={handleChange}
                                            value={values.name}
                                            onBlur={handleBlur}
                                            className={touched.name && errors.name ? "error" : null}
                                        />
                                        {touched.name && errors.name ? (
                                            <div className="error-message">{errors.name}</div>
                                        ) : null}

                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email"
                                            name="email"
                                            onChange={handleChange}
                                            value={values.email}
                                            onBlur={handleBlur}
                                            className={touched.email && errors.email ? "error" : null}
                                        />
                                        {touched.email && errors.email ? (
                                            <div className="error-message">{errors.email}</div>
                                        ) : null}
                                    </Form.Group>


                                    <Form.Group className="mb-3" controlId="formBasicAddress">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Address"
                                            name="address"
                                            onChange={handleChange}
                                            value={values.address}
                                            onBlur={handleBlur}
                                            className={touched.address && errors.address ? "error" : null}
                                        />
                                        {touched.address && errors.address ? (
                                            <div className="error-message">{errors.address}</div>
                                        ) : null}
                                    </Form.Group>


                                    <div id="checkbox-group">Checked</div>
                                    <Form.Group className="mb-3" controlId="formBasicCheck">
                                        <div class="form-check">
                                            <Field type="checkbox" class="form-check-input" name="checked" value="Yes"
                                                onChange={handleChange}
                                                onBlur={handleBlur} />
                                            <label class="form-check-label" for="flexCheckIndeterminate">
                                                Yes
                            </label>
                                        </div>

                                        <div class="form-check">
                                            <Field type="checkbox" class="form-check-input" name="checked" value="No"
                                                onChange={handleChange}
                                                onBlur={handleBlur} />
                                            <label class="form-check-label" for="flexCheckIndeterminate">
                                                No
                            </label>
                                        </div>

                                        <div class="form-check">
                                            <Field type="checkbox" class="form-check-input" name="checked" value="May Be"
                                                onChange={handleChange}
                                                onBlur={handleBlur} />
                                            <label class="form-check-label" for="flexCheckIndeterminate">
                                                May Be
                            </label>
                                        </div>
                                        {touched.checked && errors.checked ? (
                                            <div className="error-message">{errors.checked}</div>
                                        ) : null}
                                    </Form.Group>


                                    <div id="checkbox-group">Radios</div>
                                    <Form.Group className="mb-3" controlId="formBasicCheck">
                                        <div class="form-check">
                                            <Field type="radio" class="form-check-input" name="radios" value="Blue"
                                                onChange={handleChange}
                                                onBlur={handleBlur} />
                                            <label class="form-check-label" for="flexCheckIndeterminate">
                                                Blue
                            </label>

                                        </div>

                                        <div class="form-check">
                                            <Field type="radio" class="form-check-input" name="radios" value="Green"
                                                onChange={handleChange}
                                                onBlur={handleBlur} />
                                            <label class="form-check-label" for="flexCheckIndeterminate">
                                                Green
                            </label>
                                        </div>

                                        <div class="form-check">
                                            <Field type="radio" class="form-check-input" name="radios" value="Red"
                                                onChange={handleChange}
                                                onBlur={handleBlur} />
                                            <label class="form-check-label" for="flexCheckIndeterminate">
                                                Red
                            </label>
                                        </div>
                                        {touched.radios && errors.radios ? (
                                            <div className="error-message">{errors.radios}</div>
                                        ) : null}
                                    </Form.Group>

                                    <>
                                        <Form.Select aria-label="Default select example"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="cars"
                                        >

                                            <option>Select Your Country</option>
                                           {getContents()}
                                        </Form.Select>
                                        {touched.cars && errors.cars ? (
                                            <div className="error-message">{errors.cars}</div>
                                        ) : null}
                                    </>

                                    <Form.Group className="mb-3" controlId="formPhone">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control type="number" placeholder="Enter Phone Number"
                                            name="phone"
                                            onChange={handleChange}
                                            value={values.phone}
                                            onBlur={handleBlur}
                                            className={touched.phone && errors.phone ? "error" : null}
                                        />
                                        {touched.phone && errors.phone ? (
                                            <div className="error-message">{errors.phone}</div>
                                        ) : null}

                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formZip">
                                        <Form.Label>Zip Code</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Zip Code"
                                            name="zip"
                                            onChange={handleChange}
                                            value={values.zip}
                                            onBlur={handleBlur}
                                            className={touched.zip && errors.zip ? "error" : null}
                                        />
                                        {touched.zip && errors.zip ? (
                                            <div className="error-message">{errors.zip}</div>
                                        ) : null}

                                    </Form.Group>


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

export default FormikForm;