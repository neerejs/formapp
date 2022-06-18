import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as contentfulManagement from 'contentful-management';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './FormikForm.css';
import { Col, Row, Container } from 'react-bootstrap';

const FormikForm = () => {

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, "*Names must have at least 2 characters")
            .max(100, "*Names can't be longer than 100 characters")
            .required("*Name is required"),
        email: Yup.string()
            .email("*Must be a valid email address")
            .max(100, "*Email must be less than 100 characters")
            .required("*Email is required"),
        lastname: Yup.string()
            .min(2, "*Names must have at least 2 characters")
            .max(100, "*Names can't be longer than 100 characters")
            .required("*Last Name is required"),
        comments: Yup.string()
            .min(2, "*Names must have at least 2 characters")
            .max(100, "*Names can't be longer than 100 characters")
            .required("*Comments is required")

    });

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Formik initialValues={{ name: "", lastname: "", email: "", comments: "", grade: "" }}
                            validationSchema={validationSchema}
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                console.log(values)

                                setSubmitting(true)
                                setTimeout(() => {
                                    alert(JSON.stringify(values, null, 6));

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
                                                lastname: {
                                                    'en-US': values.lastname
                                                },
                                                comments: {
                                                    'en-US': values.comments
                                                },
                                                grade: {
                                                    'en-US': values.grade
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

                                <>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3" controlId="formName">
                                            <Form.Label>First Name</Form.Label>
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

                                        <Form.Group className="mb-3" controlId="formLastName">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Last Name"
                                                name="lastname"
                                                onChange={handleChange}
                                                value={values.lastname}
                                                onBlur={handleBlur}
                                                className={touched.lastname && errors.lastname ? "error" : null}
                                            />
                                            {touched.lastname && errors.lastname ? (
                                                <div className="error-message">{errors.lastname}</div>
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

                                        <Form.Group className="mb-3" controlId="formComments">
                                            <Form.Label>Comments</Form.Label>
                                            <Form.Control as="textarea" type="text" placeholder="Enter Comments"
                                                name="comments"
                                                onChange={handleChange}
                                                value={values.comments}
                                                onBlur={handleBlur}
                                                className={touched.comments && errors.comments ? "error" : null}
                                            />
                                            {touched.comments && errors.comments ? (
                                                <div className="error-message">{errors.comments}</div>
                                            ) : null}
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formRadio">

                                            {/* <label htmlFor="email" style={{ display: "block" }}>
                                                Email
                                            </label>

                                            <label>
                                                <input
                                                    type="radio"
                                                    name="grade"
                                                    value={values.grade}
                                                    checked={values.test === "a"}
                                                    onChange={handleChange()}
                                                />a
                                            </label> */}

                                            <Form.Check
                                                inline
                                                label="9th grade"
                                                name="grade"

                                                onChange={handleChange}
                                                value="9th grade"
                                                onBlur={handleBlur}
                                            />




                                        </Form.Group>

                                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                                            Submit
                                    </Button>
                                    </Form>


                                </>
                            )}
                        </Formik>

                    </Col>
                </Row>

            </Container>
        </>


    );

}

export default FormikForm;