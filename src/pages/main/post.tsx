import { Post as IPost } from "./main";
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, getDocs, collection, query, where, doc, deleteDoc } from 'firebase/firestore';
import { db, auth } from "../../config/firebase";
import { useState, useEffect } from "react";

interface Props {
    post: IPost;
}

interface Like {
    id: string;
    userId: string;
}


export const Post = (props: Props) => {
    const post = props.post;
    const [user] = useAuthState(auth);

    const [likes, setLikes] = useState<Like[] | null>(null)

    const likeRef = collection(db, "likes");
    const likeDoc = query(likeRef, where("postId","==",post.id));

    const getLikes = async () => {
        const data = await getDocs(likeDoc)
        setLikes(data.docs.map((doc) => ({id: doc.id, userId: doc.data().userId})));
    }

    const hasLike = likes?.find((like) => like.userId === user?.uid);

    const addLike = async () => {
        try {
            const newDoc = await addDoc(likeRef, {
                postId: post.id,
                userId: user?.uid
            })
            
            if (user) {
                setLikes((prev) => 
                    prev ? [...prev,{id: newDoc.id, userId: user.uid}]
                        : [{id: newDoc.id, userId: user.uid}]
                )
            }
        } catch (error) {
            console.log(error);
        }
    }

    const removeLike = async () => {
        try {
            const likeToDeleteQuery = query(
                likeRef,
                where("postId", "==", post.id),
                where("userId","==",user?.uid)
            );
            const likeToDeleteData = await getDocs(likeToDeleteQuery);
            const likeId = likeToDeleteData.docs[0].id;
            const likeToDelete = doc(db, 'likes', likeId);
            await deleteDoc(likeToDelete)
            
            if (user) {
                setLikes((prev) => prev && prev.filter((like) => like.id !== likeId) )
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { 
        getLikes();
    },[])

    return (
        <div className="post">
            <div className="title">
                <h4>{ post.title }</h4>
            </div>
            <div className="body">
                <p>{ post.description }</p>
            </div>
            <div className="footer">
                <div>
                    <button onClick={hasLike ? removeLike : addLike}>{ hasLike ? <>&times;</> : <>&#128077;</> }</button> <br />
                    {likes?.length !== 0 && <small>Likes: { likes?.length }</small>}
                </div>
                <small>@{ post.username }</small>
            </div>
        </div>
    );
}