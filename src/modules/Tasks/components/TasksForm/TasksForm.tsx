import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import './TaskForm.css';
import '../TasksList/TasksList.css';
import { Col, FloatingLabel, InputGroup, Row } from 'react-bootstrap';
import TasksList from './../TasksList/TasksList';

interface TaskFormData {
    title: string;
    description: string;
    employeeId: number;
    projectId: number;
}

export default function TaskForm() {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
        setValue,
    } = useForm<TaskFormData>({ mode: "onChange" });

    const [employees, setEmployees] = useState<any[]>([]); // Adjust type as necessary
    const [projects, setProjects] = useState<any[]>([]); // Adjust type as necessary
    const navigate = useNavigate();

    const onSubmitHandler = async (data: TaskFormData) => {
        try {
            const response = await axios.post(`https://upskilling-egypt.com:3003/api/v1/Task`, data, {
                headers: { 
                    'Authorization': localStorage.getItem("token") 
                }
            });
            toast.success("Task created successfully!");
            navigate('/dashboard/tasks'); // Navigate to the tasks list after saving
        } catch (error) {
            console.error(error);
            // toast.error(error.message || 'An error occurred');
        }
    };

    // Fetch Employees List
    const getEmployeesList = async () => {
        try {
            const response = await axios.get(`https://upskilling-egypt.com:3003/api/v1/Employee`, {
                headers: { Authorization: localStorage.getItem("token") },
            });
            setEmployees(response.data.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch employees.");
        }
    };

    // Fetch Projects List
    const getProjectsList = async () => {
        try {
            const response = await axios.get(`https://upskilling-egypt.com:3003/api/v1/Project`, {
                headers: { Authorization: localStorage.getItem("token") },
            });
            setProjects(response.data.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch projects.");
        }
    };

    useEffect(() => {
        getEmployeesList();
        getProjectsList();
    }, []);

    return (
        <>    
    <div className='bg-gray'>
        <div className='header-TaskForm'>
           <Link to='/dashboard/tasks-list'>
           <div className='d-ruby'>
                <i className="fa-solid fa-chevron-left p-2"></i> 
                <p className='fw-light '>View All Tasks</p>
            </div>
           </Link>
            <h3 className='fw-bold'>Create New Task</h3>
        </div>
            <div className='container'>
                <div className='background-module form'>
                    {/* Form  */}
                    <Form onSubmit={handleSubmit(onSubmitHandler)} className='px-5 py-3 mb-3'>
                        <Form.Group className="mb-3" controlId="formGridTitle">
                        <Form.Label>First name</Form.Label>
                                <Form.Control 
                                    placeholder="Task Title" 
                                    type="text" 
                                    {...register("title", { required: 'Task Title is required.' })} 
                                />
                            <div className='my-1'>
                                {errors?.title && <span className='text-danger'>{errors.title.message}</span>}
                            </div>
                        </Form.Group>

                        
                        <Form.Group className="mb-3" controlId="formGridDescription">
                            <Form.Label>Description</Form.Label>
                                <Form.Control 
                                    as="textarea" 
                                    placeholder="Description" 
                                    {...register("description", { required: 'Description is required.' })} 
                                />
                            {errors.description?.message && <span className='text-danger'>{errors.description.message}</span>}
                        </Form.Group>

                        <Row className="mb-3">
                        <Form.Group  as={Col} md="6" className="mb-3" controlId="formGridEmployee">
                        <Form.Label>User</Form.Label>
                                <Form.Select 
                                    {...register("employeeId", { required: 'Employee selection is required.' })} 
                                >
                                    <option value="">No Users Selected</option>
                                    {employees.map(({ id, name }) => (
                                        <option key={id} value={id}>{name}</option>
                                    ))}
                                </Form.Select>
                            <div className='my-1'>
                                {errors?.employeeId && <span className='text-danger'>{errors.employeeId.message}</span>}
                            </div>
                        </Form.Group>

                        <Form.Group as={Col} md="6" className="mb-3" controlId="formGridProject">
                        <Form.Label>Project</Form.Label>
                                <Form.Select 
                                    {...register("projectId", { required: 'Project selection is required.' })} 
                                >
                                    <option value="">Choose Project...</option>
                                    {projects.map(({ id, name }) => (
                                        <option key={id} value={id}>{name}</option>
                                    ))}
                                </Form.Select>
                            <div className='my-1'>
                                {errors?.projectId && <span className='text-danger'>{errors.projectId.message}</span>}
                            </div>
                        </Form.Group>
                        </Row>

                      <hr />
                      <div className='mt-4 d-flex justify-content-sm-between'>
                            <Link to="/dashboard/tasks-list">
                                <Button className='rounded-5 px-5 py-2 mx-2' variant="outline-dark">Cancel</Button>
                            </Link>
                            <Button className='btn btn-color rounded-5 border px-5 py-2 mx-2' disabled={isSubmitting} type="submit">
                                {isSubmitting ? "Saving..." : "Save"}
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
        </>
    );
}