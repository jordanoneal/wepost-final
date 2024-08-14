'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { RetrieveIncident } from '@/services/incident';
import { ICreateComment, IIncident } from '@common.interfaces';
import Modal from '@/components/modal/Modal';
import { CreateComment } from '@/services/comment';
import Logo from '@/components/logo/Logo';

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
            <Logo />

            <div className="border rounded-lg p-4 mb-4 bg-white shadow-lg">
                <div className="flex items-start space-x-4">
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-blue-600">{incident.originalPoster.username}</h2>
                            <span className="text-sm text-gray-500">{new Date(incident.createdAt).toLocaleString()}</span>
                        </div>
                        <h1 className="text-2xl font-bold mt-2 text-gray-800">{incident.title}</h1>
                        <p className="mt-2 text-gray-700">{incident.content}</p>
                        <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center space-x-1">
                                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8-8-3.582-8-8zm11-3a1 1 0 10-2 0v2H9a1 1 0 000 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" /></svg>
                                <span>{incident.upvotes} Upvotes</span>
                            </span>
                            <span className="flex items-center space-x-1">
                                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8-8-3.582-8-8zm11-3a1 1 0 00-2 0v2H9a1 1 0 000 2h2v2a1 1 0 002 0v-2h2a1 1 0 000-2h-2V7z" /></svg>
                                <span>{incident.downvotes} Downvotes</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {incident.comments.map(comment => (
                    <div key={comment.id} className="border rounded-lg p-4 bg-gray-50 shadow">
                        <div className="flex items-start space-x-4">
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-md font-semibold text-blue-600">{comment.commenter.username}</h3>
                                    <span className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</span>
                                </div>
                                <p className="mt-2 text-gray-700">{comment.content}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => setCommentModalOpen(true)}
                >
                    Add Comment
                </button>

                <Modal
                    title="Add a Comment"
                    isOpen={commentModalOpen}
                    onClose={closeCommentModal}
                >
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
            </div>
        </div>
    );
}
