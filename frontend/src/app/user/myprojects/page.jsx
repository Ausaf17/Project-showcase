'use client';

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AppContext';
import { ProjectCard } from '@/components/project-card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const MyProjectsPage = () => {
  const { userId } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchProjects = () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/getbycreator/${userId}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch projects');
        return res.json();
      })
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line
  }, [userId]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    setDeletingId(id);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/delete/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete project');
      fetchProjects();
    } catch (err) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  if (!userId) return <div>Please log in to see your projects.</div>;
  if (loading) return <div>Loading your projects...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-4">My Projects</h1>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project._id} className="relative group border rounded-xl shadow-sm p-4 bg-white flex flex-col gap-4">
              {/* Project Card Details (handles thumbnail) */}
              <ProjectCard {...project} />
              <div className="flex gap-2 mt-2">
                <Button
                  variant="outline"
                  asChild
                  size="sm"
                >
                  <a href={`/user/myprojects/update/${project._id}`}>Edit</a>
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(project._id)}
                  disabled={deletingId === project._id}
                >
                  {deletingId === project._id ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProjectsPage;
