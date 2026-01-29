const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("VITE_API_URL is not defined");
}

export async function getSightings() {
  const res = await fetch(`${API_URL}/api/sightings`);
  return res.json()
}

export async function createSighting(data) {
  const res = await fetch(`${API_URL}/api/sightings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json()
}

export async function updateSighting(id, data) {
  const res = await fetch(`${API_URL}/api/sightings/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function deleteSighting(id) {
  await fetch(`${API_URL}/api/sightings/${id}`, {
    method: "DELETE"
  });
}