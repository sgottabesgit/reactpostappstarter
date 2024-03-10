// src/pages/Post/EditPost.page.jsx

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, TextInput, Textarea, Button } from '@mantine/core';

function EditPostPage() {
    const { id } = useParams();
    const navigate = useNavigate();
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
            navigate(`/posts/${id}`);
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
            <TextInput
                label="Category"
                value={post.category}
                onChange={(event) => setPost({ ...post, category: event.target.value })}
            />
            <Textarea
                label="Content"
                value={post.content}
                onChange={(event) => setPost({ ...post, content: event.target.value })}
            />
            {/* Add other input fields as needed */}
            <Button onClick={handleUpdateClick}>Update</Button>
        </Container>
    );
}

export default EditPostPage;
