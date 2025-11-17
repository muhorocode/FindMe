import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MissingPersonPage() {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPerson() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://findme-backend-2.onrender.com/missing_persons/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch person details");
        }

        const data = await response.json();
        setPerson(data);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPerson();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!person) return <p className="p-6">Person not found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{person.name}</h1>

      {person.image_url && (
        <img
          src={person.image_url}
          alt={person.name}
          className="w-full max-w-md rounded-lg shadow mb-6"
        />
      )}

      <div className="space-y-2 text-gray-700">
        <p><strong>Age:</strong> {person.age}</p>
        <p><strong>Last Seen:</strong> {person.last_seen_location}</p>
        <p><strong>Status:</strong> {person.status}</p>
        <p><strong>Description:</strong> {person.description}</p>
      </div>

      <button
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={() => window.history.back()}
      >
        ← Back
      </button>
    </div>
  );
}

export default MissingPersonPage;
