// src/pages/Post/EditPost.page.jsx

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, TextInput, Button } from '@mantine/core';

function EditPostPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({
        title: '',
        category: '',
        content: '',
        authorEmail: '', // Assuming this currently holds the author's email
        tags: '',
    });

    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8085/api/posts/${id}`);
                const truncatedEmail = response.data.authorEmail.split('@')[0]; // Extract name before '@'
                setPost({
                    ...response.data,
                    authorEmail: truncatedEmail,
                });
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
            <TextInput
                label="Content"
                value={post.content}
                onChange={(event) => setPost({ ...post, content: event.target.value })}
            />
            <TextInput
                label="Author"
                value={post.authorEmail}
                onChange={(event) => setPost({ ...post, authorEmail: event.target.value })}
                disabled // Disable editing the author name directly
            />
            <TextInput
                label="Tags"
                value={post.tags}
                onChange={(event) => setPost({ ...post, tags: event.target.value })}
            />
            <Button onClick={handleUpdateClick}>Update</Button>
        </Container>
    );
}

export default EditPostPage;
