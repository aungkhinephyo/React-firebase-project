import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';

interface CreateFormData {
    title: string;
    description: string;
}

export const CreateForm = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const schema = yup.object().shape({
        title: yup.string().required('Title field is required.'),
        description: yup.string().required('Description field is required')
    })

    const { register, handleSubmit, formState: {errors} } = useForm<CreateFormData>({
        resolver: yupResolver(schema)
    })

    const postRef = collection(db, "posts");
    // firebase validation allows dummyakp001@gmail.com to create,update,delete
    const createPost = async (data: CreateFormData) => {
        // await console.log(data)
        await addDoc(postRef, {
            // title: data.title,
            // description: data.description,
            ...data,
            username: user?.displayName,
            userId: user?.uid
        })

        navigate('/');
    }

    return (
        <form onSubmit={handleSubmit(createPost)}>
            <div className='form-group'>
                <input type="text" placeholder="Title" {...register('title')} />
                <small className='error'>{ errors.title?.message }</small>
            </div>
            <div className='form-group'>
                <textarea rows={6} placeholder="Description" {...register('description')}></textarea>
                <small className='error'>{ errors.description?.message }</small>
            </div>
            <div className='text-center'>
                <input type="submit" className='btn mx-auto'/>
            </div>
        </form>
    );
}