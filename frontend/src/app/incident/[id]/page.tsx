'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { RetrieveIncident } from '@/services/incident';
import { ICreateComment, IIncident } from '../../../../../common';
import Modal from '@/components/modal/Modal';
import { CreateComment } from '@/services/comment';

export default function Incident() {
    const { id } = useParams();
    const [incident, setIncident] = useState<IIncident>();
    const [commentModalOpen, setCommentModalOpen] = useState(false);
    const [content, setContent] = useState('');

    const retrieveIncident = async () => {
        const response = await RetrieveIncident(parseInt(id as string));
        if (!response) {
            console.log('Failed to retrieve incident');
            return;
        }
        console.log(response);
        setIncident(response);
    }

    const closeCommentModal = () => {
        setCommentModalOpen(false);
    }

    const createComment = async () => {
        if (!incident) {
            console.log('Incident not found');
            return;
        }
        const params: ICreateComment = {
            content,
            commenterId: 1, // This will eventually be grabbed using the user's session
            associatedIncidentId: incident.id
        }
        const response = await CreateComment(params);
        if (!response) {
            console.log('Error creating comment');
            return;
        }
        closeCommentModal();
    }

    useEffect(() => {
        retrieveIncident();
    }, [])

    if (!incident) return <div>Could not retrieve incident.</div>;

    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="border rounded-lg p-4 mb-4 bg-white shadow">
                <div className="flex items-start space-x-4">
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">{incident.originalPoster.username}</h2>
                            <span className="text-sm text-gray-500">{new Date(incident.createdAt).toLocaleString()}</span>
                        </div>
                        <h1 className="text-xl font-bold mt-2">{incident.title}</h1>
                        <p className="mt-2">{incident.content}</p>
                        <div className="mt-4 flex items-center space-x-4">
                            <span className="text-gray-600">{incident.upvotes} Upvotes</span>
                            <span className="text-gray-600">{incident.downvotes} Downvotes</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {incident.comments.map(comment => (
                    <div key={comment.id} className="border rounded-lg p-4 bg-white shadow">
                        <div className="flex items-start space-x-4">
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-md font-semibold">{comment.commenter.username}</h3>
                                    <span className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</span>
                                </div>
                                <p className="mt-2">{comment.content}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className='mt-4'>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => setCommentModalOpen(true)}
                >
                    Add Comment
                </button>
            </div>

            <Modal title='Add Comment' isOpen={commentModalOpen} onClose={closeCommentModal}>
                <textarea
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Write your comment..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded mt-2 hover:bg-green-600"
                    onClick={createComment}
                >
                    Submit Comment
                </button>
            </Modal>
        </div >
    );
}
