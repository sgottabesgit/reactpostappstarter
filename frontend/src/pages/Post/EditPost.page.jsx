import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Text, Button, TextInput, Textarea } from "@mantine/core";
import { useNavigate, useParams } from 'react-router-dom';
import useBoundStore from "../../store/Store"; // Adjust the path accordingly

function EditPostPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const { user } = useBoundStore();

    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8085/api/posts/${id}`);
                setPost(response.data);
            } catch (error) {
                console.error("Error fetching post details:", error);
            }
        };

        fetchPostDetails();
    }, [id]);

    const handleUpdateClick = async () => {
        try {
            // Gather updated post data from form fields
            const updatedPostData = {
                title: document.getElementById("title").value,
                category: document.getElementById("category").value,
                content: document.getElementById("content").value,
                // Add more fields as needed
            };

            // Send a PUT request to update the post
            await axios.put(`http://localhost:8085/api/posts/${id}`, updatedPostData);

            // Optionally, you can navigate the user to the post details page after successful update
            navigate(`/posts/${id}`);
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    const renderEditForm = () => {
        return (
            <div>
                <TextInput id="title" label="Title" defaultValue={post.title} />
                <TextInput id="authorEmail" label="Author Email" defaultValue={post.authorEmail} disabled />
                <TextInput id="category" label="Category" defaultValue={post.category} />
                <Textarea id="content" label="Content" defaultValue={post.content} />
                {/* Add more form fields as needed */}
                <Button onClick={handleUpdateClick}>Update</Button>
            </div>
        );
    };



    return (
        <Container>
            {user && post?.userId === user.id ? (
                renderEditForm()
            ) : (
                <p>Loading...</p>
            )}
        </Container>
    );
}

export const editPostLoader = async ({ params }) => {
    const id = params.id;
    const response = await axios.get(`http://localhost:8085/api/posts/${id}`);
    return response.data;
};

export default EditPostPage;
