import { useState } from 'react'

export const useForm = (initialForm, validateForm, peticion) => {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);

    const handleChange = (e)=>{
        const {name,value} = e.target;
    
        setForm({
            ...form,
            [name]:value < 0 ? 0 : value 
        })
        
        validateForm && setErrors(validateForm(form)); 
    }

    const handleBlur = (e)=>{
        handleChange(e);   
        validateForm && setErrors(validateForm(form)); 
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setResponse("");
        validateForm && setErrors(validateForm(form)); 
        setLoading(true);
        if (Object.keys(errors).length === 0) {    
           try {
            const response = await peticion(form)
            setForm(initialForm);
            setLoading(false);
            setResponse(response);
           } catch (error) {
             console.log(error);
           }
        }else{
            setLoading(false);
            setResponse("");
        }
    }

    return{
        form,
        errors,
        loading,
        response,
        handleBlur,
        handleChange,
        handleSubmit
    }

}
