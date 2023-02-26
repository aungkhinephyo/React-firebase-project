import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useState, useEffect } from 'react';
import { Post } from './post';

export interface Post {
    id: string;
    userId: string;
    username: string;
    title: string;
    description: string;
}

export const Main = () => {
    const [postList, setPostList] = useState<Post[] | null>(null);
    const postRef = collection(db, "posts");

    const getPosts = async () => {
        const data = await getDocs(postRef);
        setPostList(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id})) as Post[]
        );
    }
    
    useEffect(() => {
        getPosts();
    },[])

    return (
        <div className="container">
            <h3>Main Page</h3>
            <div className='post-container'>
                {
                    postList?.map((post, key) => (<Post key={key} post={post} />))
                }
            </div>
        </div>
    );
}