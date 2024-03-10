// src/pages/Post/EditPost.page.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Container, Input, Textarea, Button } from '@mantine/core';

function EditPostPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [updatedContent, setUpdatedContent] = useState('');
    const history = useHistory();

    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8085/api/posts/${id}`);
                setPost(response.data);
                setUpdatedContent(response.data.content);
            } catch (error) {
                console.error('Error fetching post details:', error);
            }
        };

        fetchPostDetails();
    }, [id]);

    const handleUpdateClick = async () => {
        // Update the post content
        await axios.put(`http://localhost:8085/api/posts/${id}`, { content: updatedContent });
        // Redirect back to the post details page
        history.push(`/posts/${id}`);
    };

    return (
        <Container>
            {post ? (
                <>
                    <div>
                        <Textarea
                            value={updatedContent}
                            onChange={(event) => setUpdatedContent(event.target.value)}
                        />
                    </div>
                    <Button onClick={handleUpdateClick}>Update</Button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </Container>
    );
}

export const editPostLoader = async ({ params }) => {
    const postId = params.id;
    const response = await axios.get(`http://localhost:8085/api/posts/${postId}`);
    return response.data;
};

export default EditPostPage;
