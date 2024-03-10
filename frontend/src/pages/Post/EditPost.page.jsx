// src/pages/Post/EditPost.page.jsx

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, TextInput, Button } from '@mantine/core';

function EditPostPage() {
    const { id } = useParams();
    const history = useNavigate();
    const [post, setPost] = useState({
        title: '',
        category: '',
        content: '',
        // Add other fields as needed
    });

    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8085/api/posts/${id}`);
                setPost(response.data);
            } catch (error) {
                console.error('Error fetching post details:', error);
            }
        };

        fetchPostDetails();
    }, [id]);

    const handleUpdateClick = async () => {
        try {
            // Add logic to update the post
            await axios.put(`http://localhost:8085/api/posts/${id}`, post);
            history.push(`/posts/${id}`);
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    return (
        <Container>
            <TextInput
                label="Title"
                value={post.title}
                onChange={(event) => setPost({ ...post, title: event.target.value })}
            />
            {/* Add other input fields for category, content, etc. */}
            <Button onClick={handleUpdateClick}>Update</Button>
        </Container>
    );
}

export default EditPostPage;
