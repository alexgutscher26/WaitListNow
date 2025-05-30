import { CreateWaitlistData } from "@/types/waitlist";

const API_URL = '/api/waitlists';

/**
 * Fetches all waitlists for the current user
 */
export async function getWaitlists() {
  const response = await fetch(API_URL);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch waitlists');
  }
  
  return response.json();
}

/**
 * Creates a new waitlist
 */
export async function createWaitlist(data: CreateWaitlistData) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create waitlist');
  }

  return response.json();
}

/**
 * Updates an existing waitlist
 */
export async function updateWaitlist(id: string, data: Partial<CreateWaitlistData>) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update waitlist');
  }

  return response.json();
}

/**
 * Deletes a waitlist
 */
export async function deleteWaitlist(id: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete waitlist');
  }

  return response.json();
}
