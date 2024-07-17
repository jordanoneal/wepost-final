'use client'
import React, { useEffect, useState } from 'react'
import { ICreateIncident, IIncident, Location } from '../../../common'
import { CreateIncident, RetrieveIncidents } from '../services'
import Modal from '@/components/modal/Modal'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/authContext'

export default function Home() {
  const router = useRouter();
  const authContext = useAuth();
  const user = authContext.user;

  const [incidents, setIncidents] = useState<IIncident[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [location, setLocation] = useState<Location>({ zipCode: '', city: '', state: '' });

  const retrieveIncidents = async () => {
    const response = await RetrieveIncidents();
    if (!response) {
      console.error('Failed to retrieve incidents');
      return;
    }
    setIncidents(response);
  };

  const handleUpvote = (e: React.MouseEvent<HTMLButtonElement>, incidentId: number) => {
    e.stopPropagation();
    // Send upvote request
    console.log('Upvoting', incidentId);
  };

  const handleDownVote = (e: React.MouseEvent<HTMLButtonElement>, incidentId: number) => {
    // Send downvote request
    e.stopPropagation();
    console.log('Downvoting', incidentId);
  };

  const viewPost = (incidentId: number) => {
    router.push(`/incident/${incidentId}`);
  };

  const createPost = async () => {
    const params: ICreateIncident = {
      title,
      content,
      location,
      originalPosterId: user!.id
    };
    const response = await CreateIncident(params);
    if (!response) {
      console.log('Failed to create incident');
      return;
    }
    closeModal();
    retrieveIncidents();
  };

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setTitle('');
    setContent('');
    setLocation({ zipCode: '', city: '', state: '' });
  };

  useEffect(() => {
    retrieveIncidents();
  }, [])

  return (
    <div className="max-w-2xl mx-auto my-8">
      <div className='text-center'>
        <h1 className="text-3xl font-bold mb-6">Incident Timeline</h1>
        <button
          className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4'
          onClick={openModal}
        >Create Post
        </button>
      </div>
      {incidents.map((incident) => (
        <div key={incident.id} className="bg-white rounded-lg shadow-md mb-4 p-4 transition-shadow duration-300 ease-in-out hover:shadow-lg"
          onClick={() => viewPost(incident.id)}
        >
          <h2 className="font-semibold text-xl">{incident.title}</h2>
          <p className="text-gray-800 text-sm mt-2">{incident.content}</p>
          <div className="text-gray-600 text-xs my-1">
            <span>Location: {incident.location.city}, {incident.location.state}</span>
          </div>
          <div className="flex items-center justify-between my-2">
            <div>
              <button className="text-green-500 hover:bg-green-100 p-1 rounded mr-2"
                onClick={(e) => handleUpvote(e, incident.id)}
              >
                👍 {incident.upvotes}
              </button>
              <button className="text-red-500 hover:bg-red-100 p-1 rounded"
                onClick={(e) => handleDownVote(e, incident.id)}
              >
                👎 {incident.downvotes}
              </button>
              <button className="text-blue-500 hover:bg-blue-100 p-1 rounded">
                💬 {incident.comments.length}
              </button>
            </div>
            <span className="text-gray-500 text-xs">
              Posted by {incident.originalPoster.username}
            </span>
          </div>
          <div className="text-gray-500 text-xs">
            <span>{new Date(incident.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      ))}

      <Modal
        title='Create Post'
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        <div>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-semibold text-gray-600">Title</label>
            <input type="text" name="title" id="title" className="w-full mt-1 p-2 border border-gray-300 rounded"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-semibold text-gray-600">Content</label>
            <textarea name="content" id="content" className="w-full mt-1 p-2 border border-gray-300 rounded"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block text-sm font-semibold text-gray-600">City</label>
            <input type="text" name="city" id="city" className="w-full mt-1 p-2 border border-gray-300 rounded"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation({ ...location, city: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="state" className="block text-sm font-semibold text-gray-600">State</label>
            <input type="text" name="state" id="state" className="w-full mt-1 p-2 border border-gray-300 rounded"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation({ ...location, state: e.target.value })}
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={createPost} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Post
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
